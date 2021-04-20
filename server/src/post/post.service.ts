import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { SubService } from 'src/sub/sub.service';
import { Repository } from 'typeorm';
import CreatePostDTO from './dto/create-post.dto';
import Post from './post.entity';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
        private subService: SubService
    ) {}

    public async createPost(req: Request, postData: CreatePostDTO) {
        try {
            const { user } = req
            const { title, body, sub } = postData

            // find sub
            const subRecord = await this.subService.findOneSubOrFail(sub)

            const post = this.postRepository.create({ title, body, user, sub: subRecord })
            await this.postRepository.save(post)

            return post
        } catch (err) {
            if(err.name.includes('NotFound')) {
                throw new HttpException(`Sub doesn't exist`, HttpStatus.BAD_REQUEST)
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    public async getRecentPosts(req: Request) {
        try {
            const currentPage: number = (req.query.page || 0) as number
            const postsPerPage: number = (req.query.count || 8) as number

            const posts = await this.postRepository.find({
                order: { createdAt: 'DESC' }, 
                relations: ['user', 'sub'],
                skip: currentPage * postsPerPage,
                take: postsPerPage, 
            })
            let user: any
            
            if (req.user) {
                user = req.user
                posts.forEach((p) => p.setUserVote(user))
            }
            // posts.forEach(p => {
            //     p.comments = undefined
            // })
            return posts
        } catch (err) {
            if(err.name.includes('NotFound')) {
                throw new HttpException(`No posts found`, HttpStatus.NOT_FOUND)
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    public async getPost(req: Request, relations: boolean = true) {
        const { identifier, slug } = req.params
        try {
            const post = await this.postRepository.findOneOrFail({ 
                where: {identifier, slug}, 
                relations: relations ? ['sub', 'user'] : []
            })
            let user: any
            
            if (req.user) {
                user = req.user
                post.setUserVote(user)
            }

            return post
        } catch (err) {
            if(err.name.includes('NotFound')) {
                throw new HttpException(`Post doesn't exist`, HttpStatus.NOT_FOUND)
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}

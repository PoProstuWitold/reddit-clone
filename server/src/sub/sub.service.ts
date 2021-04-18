import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import Post from '../post/post.entity';
import { Repository } from 'typeorm';
import CreateSubDTO from './dto/create-sub.dto';
import Sub from './sub.entity';

@Injectable()
export class SubService {
    constructor(
        @InjectRepository(Sub)
        private subRepository: Repository<Sub>,
        @InjectRepository(Post)
        private postRepository: Repository<Post>
    ) {}

    public async createSub(req: Request, subData: CreateSubDTO) {
        const { user } = req
        const { name, title, description } = subData

        try {           
            const sub = await this.subRepository
                .createQueryBuilder('sub')
                .where('lower(sub.name) = :name', { name: name.toLowerCase() })
                .getOne()
            
            if(sub) {
                throw new HttpException('Sub already exists', HttpStatus.BAD_REQUEST)
            }

            const newSub = await this.subRepository.create({
                name,
                title,
                description,
                user
            })
            await this.subRepository.save(newSub)
            console.log(newSub)
            return newSub
        } catch (err) {
            if(err.status === 400) {
                throw new HttpException('Sub already exists', HttpStatus.BAD_REQUEST)
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    public async findOneSubOrFail(name: string): Promise<Sub | null> {
        return await this.subRepository.findOneOrFail({ name: name })
    }

    public async getSub(req: Request, name: string) {
        try {
            const sub = await this.subRepository
                .createQueryBuilder('sub')
                .where('lower(sub.name) = :name', { name: name.toLowerCase() })
                .getOne()
                
            const posts = await this.postRepository.find({
                where: { sub },
                order: { createdAt: 'DESC' },
                relations: ['user']
            })
            
            sub.posts = posts
            let user: any

            if (req.user) {
                user = req.user
                posts.forEach((p) => p.setUserVote(user))
            }

            return sub
        } catch (err) {
            console.log(err)
            if(err.name.includes('NotFound')) {
                throw new HttpException(`No sub found`, HttpStatus.NOT_FOUND)
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}

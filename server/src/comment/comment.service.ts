import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { PostService } from 'src/post/post.service';
import { Repository } from 'typeorm';
import Comment from './comment.entity';
import CreateCommentDTO from './dto/create-comment.dto';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,
        private postService: PostService
    ) {}

    public async commentOnPost(req: Request, commentData: CreateCommentDTO) {
        try {
            const post = await this.postService.getPost(req, false)

            const comment = this.commentRepository.create({
                body: commentData.body,
                user: req.user,
                post
            })

            await this.commentRepository.save(comment)

            return comment
        } catch (err) {
            console.log(err)
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    public async getPostComments(req: Request) {
        try {
            let user: any
            const post = await this.postService.getPost(req, false)

            const comments = await this.commentRepository.find({
                where: { post },
                order: { createdAt: 'DESC' },
                relations: ['user']
            })

            if (req.user) {
                user = req.user
                comments.forEach((c) => c.setUserVote(user))
            }

            return comments
        } catch (err) {
            console.log(err)
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
        }
            
    }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import Comment from '../comment/comment.entity';
import Post from '../post/post.entity';
import { Repository } from 'typeorm';
import CreateUserDTO from './dto/create-user.dto';
import User from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,
    ) {}

    public async create(userData: CreateUserDTO) {
        const newUser = this.userRepository.create(userData)
        await this.userRepository.save(newUser)
        return newUser
    }

    public async getByEmail(email: string) {
        const user = await this.userRepository.findOne({ email })

        if(!user) {
            throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND)
        }

        return user
    }

    async getById(id: number) {
        const user = await this.userRepository.findOne({ id })

        if(!user) {
            throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND)
        }

        return user
    }

    async getByNick(nick: string) {
        const user = await this.userRepository.findOne({ nick }, { select: ['createdAt', 'nick', 'id'] })

        if(!user) {
            throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND)
        }

        return user
    }

    public async getUserSubmission(req: Request, nick: string) {
        const user = await this.getByNick(nick)

        const posts = await this.postRepository.find({
            where: { user },
            relations: ['sub', 'user'],
        })

        const comments = await this.commentRepository.find({
            where: { user },
            relations: ['post', 'user'],
        })

        let reqUser: any

        if (req.user) {
            reqUser = req.user
            posts.forEach((p) => p.setUserVote(reqUser))
            comments.forEach((c) => c.setUserVote(reqUser))
        }

        let submissions: any[] = []
            posts.forEach((p) => submissions.push({ type: 'Post', ...p.toJSON() }))
            comments.forEach((c) =>
            submissions.push({ type: 'Comment', ...c.toJSON() })
        )

        submissions.sort((a, b) => {
            if (b.createdAt > a.createdAt) return 1
            if (b.createdAt < a.createdAt) return -1
            return 0
        })

        return { user, submissions }
    }
}

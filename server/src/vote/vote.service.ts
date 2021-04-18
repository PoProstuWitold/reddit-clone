import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import Vote from './vote.entity';
import Comment from '../comment/comment.entity';
import Post from '../post/post.entity';

@Injectable()
export class VoteService {
    constructor(
        @InjectRepository(Vote)
        private voteRepository: Repository<Vote>,
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>
    ) {}

    public async vote(req: Request) {
        // Validate vote value
        const { postIdentifier, slug, commentIdentifier, value } = req.body
        const { user } = req
        if (![-1, 0, 1].includes(value)) {
            throw new HttpException('Value must be -1, 0 or 1', HttpStatus.BAD_REQUEST)
        }

        try {
            let post = await this.postRepository.findOneOrFail({ identifier: postIdentifier, slug })
            let vote: Vote | undefined
            let comment: Comment | undefined

            if (commentIdentifier) {
                // IF there is a comment identifier find vote by comment
                comment = await this.commentRepository.findOneOrFail({ identifier: commentIdentifier })
                vote = await this.voteRepository.findOne({ user, comment })
            } else {
                // Else find vote by post
                vote = await this.voteRepository.findOne({ user, post })
            }

            if (!vote && value === 0) {
                // if no vote and value = 0 return error
                throw new HttpException('Vote not found', HttpStatus.NOT_FOUND)
            } else if (!vote) {
                // If no vote create it
                vote = this.voteRepository.create({ user, value })
                if (comment) vote.comment = comment
                else vote.post = post
                await this.voteRepository.save(vote)
            } else if (value === 0) {
                // If vote exists and value = 0 remove vote from DB
                await this.voteRepository.remove(vote)
            } else if (vote.value !== value) {
                // If vote and value has changed, update vote
                vote.value = value
                await this.voteRepository.save(vote)
            }

            post = await this.postRepository.findOneOrFail(
                { identifier: postIdentifier, slug },
                { relations: ['sub'] }
            )
            //@ts-ignore
            post.setUserVote(user)
            //@ts-ignore
            post.comments.forEach((c) => c.setUserVote(user))

            return post
        } catch (err) {
            console.log(err)
            if(err.name.includes('NotFound')) {
                throw new HttpException(`Post or comment doesn't exist`, HttpStatus.NOT_FOUND)
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}

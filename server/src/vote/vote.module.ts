import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Comment from '../comment/comment.entity';
import Post from '../post/post.entity';
import { VoteController } from './vote.controller';
import Vote from './vote.entity';
import { VoteService } from './vote.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vote, Post, Comment])],
  controllers: [VoteController],
  providers: [VoteService]
})
export class VoteModule {}

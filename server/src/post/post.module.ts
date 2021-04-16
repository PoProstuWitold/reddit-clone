import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import Post from './post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubModule } from 'src/sub/sub.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), SubModule],
  providers: [PostService],
  controllers: [PostController],
  exports: [PostService]
})
export class PostModule {}

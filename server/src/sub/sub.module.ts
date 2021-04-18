import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Post from '../post/post.entity';
import { SubController } from './sub.controller';
import Sub from './sub.entity';
import { SubService } from './sub.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sub, Post])],
  controllers: [SubController],
  providers: [SubService],
  exports: [SubService]
})
export class SubModule {}

import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OptionalJwtAuthGuard } from 'src/auth/guards/optional-jwt-auth.guard';
import CreatePostDTO from './dto/create-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(
        private readonly postService: PostService
    ) {}

    @Post('create')
    @UseGuards(JwtAuthGuard)
    public async createPost(
        @Req() req: Request,
        @Body() postData: CreatePostDTO
    ) {
        return this.postService.createPost(req, postData)
    }

    @Get('posts')
    @UseGuards(OptionalJwtAuthGuard)
    public async getRecentPosts(
        @Req() req: Request
    ) {
        return this.postService.getRecentPosts(req)
    }

    @Get('/:identifier/:slug')
    @UseGuards(OptionalJwtAuthGuard)
    public async getPost(
        @Req() req: Request
    ) {
        return this.postService.getPost(req)
    }
}

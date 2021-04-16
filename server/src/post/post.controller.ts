import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
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
    public async getRecentPosts() {
        return this.postService.getRecentPosts()
    }

    @Get('/:identifier/:slug')
    public async getPost(
        @Req() req: Request
    ) {
        return this.postService.getPost(req)
    }
}

import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CommentService } from './comment.service';
import CreateCommentDTO from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {
    constructor(
        private readonly commentService: CommentService
    ) {}

    @Post('/:identifier/:slug')
    @UseGuards(JwtAuthGuard)
    public async commentOnPost(
        @Req() req: Request,
        @Body() commentData: CreateCommentDTO
    ) {
        return await this.commentService.commentOnPost(req, commentData)
    }
}

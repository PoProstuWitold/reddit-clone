import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { VoteService } from './vote.service';

@Controller('vote')
export class VoteController {
    constructor(
        private readonly voteService: VoteService
    ) {}

    @Post('/')
    @UseGuards(JwtAuthGuard)
    public async vote(
        @Req() req: Request
    ) {
        return this.voteService.vote(req)
    }
}

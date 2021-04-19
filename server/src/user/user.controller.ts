import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Get(':nick')
    @UseGuards(OptionalJwtAuthGuard)
    public async getPost(
        @Req() req: Request,
        @Param('nick') nick: string
    ) {
        return this.userService.getUserSubmission(req, nick)
    }
}    

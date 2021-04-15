import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SubService } from './sub.service';
import CreateSubDTO from './dto/create-sub.dto'
import { Request } from 'express';

@Controller('sub')
export class SubController {
    constructor(
        private readonly subService: SubService
    ) {}

    @Post('create')
    @UseGuards(JwtAuthGuard)
    public async createPost(
        @Req() req: Request,
        @Body() subData: CreateSubDTO
    ) {
        return await this.subService.createSub(req, subData)
    }
}

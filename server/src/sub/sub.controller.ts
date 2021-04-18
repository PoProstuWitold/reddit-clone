import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SubService } from './sub.service';
import CreateSubDTO from './dto/create-sub.dto'
import { Request } from 'express';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard';

@Controller('sub')
export class SubController {
    constructor(
        private readonly subService: SubService
    ) {}

    @Post('create')
    @UseGuards(JwtAuthGuard)
    public async createSub(
        @Req() req: Request,
        @Body() subData: CreateSubDTO
    ) {
        return await this.subService.createSub(req, subData)
    }

    @Get(':name')
    @UseGuards(OptionalJwtAuthGuard)
    public async getSub(
        @Req() req: Request,
        @Param('name') name: string
    ) {
        // console.log(name)
        return await this.subService.getSub(req, name)
    }
}

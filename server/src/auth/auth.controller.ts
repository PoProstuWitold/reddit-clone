import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import LoginDTO from './dto/login.dto';
import RegisterDTO from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import JwtRefreshGuard from './guards/jwt-refresh.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

declare global{
    namespace Express {
        interface User {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            firstName: string;
            lastName: string;
            nick: string;
        }
    }
}

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('register')
    async register(
        @Body() registrationData: RegisterDTO,
        @Req() req: Request
    ) {
        return this.authService.register(registrationData, req)
    }

    @HttpCode(200)
    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(
        @Body() credentials: LoginDTO,
        @Req() req: Request
    ) {
        return this.authService.login(credentials, req)
    }

    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(
        @Req() req: Request
    ) {
        await this.authService.logout(req)
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    public async testAuth(
        @Req() req: Request
    ) {
        return req.user;
    }

    @Get('refresh')
    @UseGuards(JwtRefreshGuard)
    public async refresh(
        @Req() req: Request
    ) {
        this.authService.setNewTokens(req)
        return req.user
    }    

}

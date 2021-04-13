import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import LoginDTO from './dto/login.dto';
import RegisterDTO from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

declare global{
    namespace Express {
        interface Request {
            userId: number,
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

    @Get('whoami')
    @UseGuards(JwtAuthGuard)
    public async testAuth(
        @Req() req: Request
    ) {
        console.log(req.cookies)
        return req.user;
    }
}

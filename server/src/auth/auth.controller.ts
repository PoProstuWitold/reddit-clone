import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import User from '../user/user.entity';
import { AuthService } from './auth.service';
import LoginDTO from './dto/login.dto';
import RegisterDTO from './dto/register.dto';

declare global{
    namespace Express {
        interface Request {
            user: User
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
        @Body() registrationData: RegisterDTO
    ) {
        return this.authService.register(registrationData)
    }

    @HttpCode(200)
    @Post('login')
    async login(
        @Body() credentials: LoginDTO
    ) {
        return this.authService.login(credentials)
    }
}

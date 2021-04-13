import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { Request } from 'express';
import PostgresErrorCode from 'src/database/postgres-errors.enum';
import { UserService } from '../user/user.service';
import LoginDTO from './dto/login.dto';
import RegisterDTO from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService
    ) {}

    public async register(registrationData: RegisterDTO) {
        const hashedPassword = await argon2.hash(registrationData.password)

        try {
            const createdUser = await this.userService.create({
                ...registrationData,
                password: hashedPassword
            });

            return createdUser;

        } catch (err) {
            if(err?.code === PostgresErrorCode.UniqueViolation) {
                throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST)
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    public async login(credentials: LoginDTO) {
        const { email, password } = credentials
        try {
            const user = await this.userService.getByEmail(email)
            if(!user) {
                throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST)
            }

            const isMatch = await argon2.verify(user.password, password)
            if(!isMatch) {
                throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST)
            }

            return user
        } catch (err) {
            console.log(err)
            throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST)
        }
    }
}

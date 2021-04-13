import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateUserDTO from './dto/create-user.dto';
import User from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    public async create(userData: CreateUserDTO) {
        const newUser = this.userRepository.create(userData)
        await this.userRepository.save(newUser)
        return newUser
    }

    public async getByEmail(email: string) {
        const user = await this.userRepository.findOne({ email })

        if(!user) {
            throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND)
        }

        return user
    }

    async getById(id: number) {
        const user = await this.userRepository.findOne({ id })

        if(!user) {
            throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND)
        }

        return user
    }
}

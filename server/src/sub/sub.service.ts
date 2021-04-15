import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import CreateSubDTO from './dto/create-sub.dto';
import Sub from './sub.entity';

@Injectable()
export class SubService {
    constructor(
        @InjectRepository(Sub)
        private subRepository: Repository<Sub>
    ) {}

    public async createSub(req: Request, subData: CreateSubDTO) {
        const { user } = req
        const { name, title, description } = subData

        try {           
            const sub = await this.subRepository
                .createQueryBuilder('sub')
                .where('lower(sub.name) = :name', { name: name.toLowerCase() })
                .getOne()
            
            if(sub) {
                throw new HttpException('Sub already exists', HttpStatus.BAD_REQUEST)
            }

            const newSub = await this.subRepository.create({
                name,
                title,
                description,
                user
            })
            await this.subRepository.save(newSub)
            console.log(newSub)
            return newSub
        } catch (err) {
            if(err.status === 400) {
                throw new HttpException('Sub already exists', HttpStatus.BAD_REQUEST)
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    public async findOneSubOrFail(name: string): Promise<Sub | null> {
        return await this.subRepository.findOneOrFail({ name: name })
    }
}

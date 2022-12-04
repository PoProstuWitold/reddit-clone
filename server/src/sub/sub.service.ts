import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Post from '../post/post.entity';
import { getConnection, Repository } from 'typeorm';
import CreateSubDTO from './dto/create-sub.dto';
import Sub from './sub.entity';
import * as fs from 'fs'

@Injectable()
export class SubService {
    constructor(
        @InjectRepository(Sub)
        private subRepository: Repository<Sub>,
        @InjectRepository(Post)
        private postRepository: Repository<Post>
    ) {}

    public async createSub(req: any, subData: CreateSubDTO) {
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

    public async getSub(req: any, name: string) {
        try {
            const sub = await this.subRepository
                .createQueryBuilder('sub')
                .leftJoinAndSelect('sub.user', 'user')
                .where('lower(sub.name) = :name', { name: name.toLowerCase() })
                .getOne()
                
            const posts = await this.postRepository.find({
                where: { sub },
                order: { createdAt: 'DESC' },
                relations: ['user']
            })
            
            sub.posts = posts
            let user: any

            if (req.user) {
                user = req.user
                posts.forEach((p) => p.setUserVote(user))
            }

            return sub
        } catch (err) {
            console.log(err)
            if(err.name.includes('NotFound')) {
                throw new HttpException(`No sub found`, HttpStatus.NOT_FOUND)
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }



    public async uploadSubImage(req: any, name: string, file: Express.Multer.File) {
        //@ts-ignore
        const sub: Sub = req.sub
        const { user } = req
        const type = req.body.type
        

        try {
            if (type !== 'image' && type !== 'banner') {
                fs.unlinkSync(req.file.path)
                return req.res.status(400).json({ error: 'Invalid type' })
            }
            let oldImageUrn: string = ''
            if (type === 'image') {
                oldImageUrn = sub.imageUrn ?? ''
                sub.imageUrn = req.file.filename
            } else if (type === 'banner') {
                oldImageUrn = sub.bannerUrn ?? ''
                sub.bannerUrn = req.file.filename
            }
            await this.subRepository.save(sub)

            if (oldImageUrn !== '') {
                fs.unlinkSync(`./public/images/${oldImageUrn}`)
            }

            return sub
        } catch (err) {
            console.log(err)
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    public async getTopSubs() {
        try {
            const imageUrlExp = `COALESCE('${process.env.APP_URL}/public/images/' || s.image_urn , 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y')`
            const subs = await getConnection()
                .createQueryBuilder()
                .select(
                    `s.title, s.name, ${imageUrlExp} as "imageUrl", count(p.id) as "postCount"`
                )
                .from(Sub, 's')
                .leftJoin(Post, 'p', `s.name = p.sub_name`)
                .groupBy('s.title, s.name, "imageUrl"')
                .orderBy(`"postCount"`, 'DESC')
                .limit(5)
                .execute()

            return subs
        } catch (err) {
            console.log(err)
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    public async searchSub(req: Request, name: string) {
        try {
        
            // reactJS , reactjs
            const subs = await this.subRepository
                .createQueryBuilder()
                // react => rea
                .where('LOWER(name) LIKE :name', {
                    name: `${name.toLowerCase().trim()}%`,
                })
                .getMany()
            
                return subs
        } catch (err) {
                console.log(err)
                if(err.name.includes('NotFound')) {
                    throw new HttpException(`Sub doesn't exist`, HttpStatus.NOT_FOUND)
                }
                throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}

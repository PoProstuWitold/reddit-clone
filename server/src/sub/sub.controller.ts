import { Body, Controller, Get, Param, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SubService } from './sub.service';
import CreateSubDTO from './dto/create-sub.dto'
import { Request } from 'express';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from '../shared/multer/editFileName';
import { imageFileFilter } from '../shared/multer/imageFileFilter';
import { OwnSubGuard } from './guards/own-sub.guard';

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

    @Post(':name/upload')
    @UseGuards(JwtAuthGuard)
    @UseGuards(OwnSubGuard)
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './public/images',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
          })
    )
    public async uploadSubImage(
        @Req() req: Request,
        @Param('name') name: string,
        @UploadedFile() file: Express.Multer.File
    ) {
        // const response = {
        //     originalname: file.originalname,
        //     filename: file.filename,
        // };
        // return response;
        return this.subService.uploadSubImage(req, name, file)
    }
}

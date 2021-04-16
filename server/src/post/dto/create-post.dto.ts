import { IsString, IsNotEmpty, MinLength, MaxLength, IsOptional } from 'class-validator'

export default class CreatePostDTO {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(80)
    title: string

    @IsString()
    @IsOptional()
    @MaxLength(400)
    body: string

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(80)
    sub: string
}
import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator'

export default class CreateCommentDTO {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(80)
    body: string
}
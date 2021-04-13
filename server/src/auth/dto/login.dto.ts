import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator'

export default class LoginDTO {
    @IsEmail()
    @MaxLength(80)
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    @MaxLength(80)
    password: string
}
import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator'

export default class RegisterDTO {
    @IsEmail()
    @MaxLength(80)
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(80)
    firstName: string

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(80)
    lastName: string

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(80)
    nick: string

    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    @MaxLength(80)
    password: string
}
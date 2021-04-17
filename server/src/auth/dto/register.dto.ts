import { IsEmail, IsString, IsNotEmpty, Length } from 'class-validator'

export default class RegisterDTO {
    @IsEmail()
    @Length(2, 80)
    email: string

    @IsString()
    @IsNotEmpty()
    @Length(2, 80)
    firstName: string

    @IsString()
    @IsNotEmpty()
    @Length(2, 80)
    lastName: string

    @IsString()
    @IsNotEmpty()
    @Length(2, 80)
    nick: string

    @IsString()
    @IsNotEmpty()
    @Length(7, 80)
    password: string
}
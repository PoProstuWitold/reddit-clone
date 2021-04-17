import { IsEmail, IsString, IsNotEmpty, Length } from 'class-validator'

export default class LoginDTO {
    @IsEmail()
    @Length(2, 80)
    email: string

    @IsString()
    @IsNotEmpty()
    @Length(7, 80)
    password: string
}
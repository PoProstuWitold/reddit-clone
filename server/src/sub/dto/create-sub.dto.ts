import { IsString, IsNotEmpty, MinLength, MaxLength, IsOptional } from 'class-validator'

export default class CreateSubDTO {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(80)
    name: string

    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    @MaxLength(80)
    title: string

    @IsString()
    @IsOptional()
    @MaxLength(80)
    description: string
}
/* eslint-disable prettier/prettier */
import { IsString, IsInt, IsBoolean, Length } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @Length(2, 100)
    firstname: string;

    @IsString()
    @Length(2, 100)
    lastname: string;

    @IsString()
    @Length(2, 100)
    email: string;

    @IsString()
    @Length(2, 140)
    password: string;

    @IsBoolean()
    isVerified: boolean = false;
}
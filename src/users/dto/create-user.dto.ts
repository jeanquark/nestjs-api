/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsEmail, IsBoolean, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @Length(2, 100)
    firstname: string;

    @IsString()
    @Length(2, 100)
    lastname: string;

    @IsEmail()
    @IsNotEmpty()
    @Length(2, 100)
    email: string;

    @IsString()
    @Length(2, 140)
    password: string;

    @IsBoolean()
    isVerified: boolean = false;
}
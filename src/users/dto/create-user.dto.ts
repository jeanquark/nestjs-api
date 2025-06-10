/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsBoolean, Length } from 'class-validator';

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
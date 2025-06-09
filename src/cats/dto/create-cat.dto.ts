/* eslint-disable prettier/prettier */
import { IsString, IsInt, IsBoolean, Length } from 'class-validator';

export class CreateCatDto {
    // readonly name: string;
    // readonly age: number;
    // readonly breed: string;

    @IsString()
    @Length(2, 100)
    name: string;

    @IsInt()
    age: number;

    @IsString()
    @Length(2, 100)
    breed: string;

    @IsString()
    @Length(2, 100)
    color: string;

    @IsString()
    @Length(2, 100)
    gender: string;

    // @IsBoolean()
    // isActive: boolean = true;
}
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
// import CreateCatDto from "./create-cat.dto"
import { IsString, IsBoolean, Length, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  @Length(2, 100)
  firstname?: string;

  @IsOptional()
  @IsString()
  @Length(2, 100)
  lastname?: string;

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;
}
/* eslint-disable prettier/prettier */
// export default class UpdateCatDto {
//     readonly name?: string;
//     readonly age?: number;
//     readonly breed?: string;
// }

import { PartialType } from '@nestjs/mapped-types';
import { CreateCatDto } from './create-cat.dto';
// import CreateCatDto from "./create-cat.dto"
import { IsString, IsInt, IsBoolean, Length, IsOptional } from 'class-validator';

export class UpdateCatDto extends PartialType(CreateCatDto) {
  @IsOptional()
  @IsString()
  @Length(2, 100)
  name?: string;

  @IsOptional()
  @IsInt()
  age?: number;

  @IsOptional()
  @IsString()
  @Length(2, 100)
  breed?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
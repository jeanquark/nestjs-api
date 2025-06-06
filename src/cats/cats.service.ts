/* eslint-disable prettier/prettier */
// src/cats/cats.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat, CatDocument } from './schemas/cat.schema';

@Injectable()
export class CatsService {
    constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) { }

    async findAll(): Promise<Cat[]> {
        // return this.catModel.find().exec();
        try {
            return await this.catModel.find().exec();
        } catch (error) {
            console.log('error: ', error);
            throw new InternalServerErrorException('Failed to retrieve cats');
        }
    }

    // You can also add pagination and filtering:
    async findAllWithPagination(
        skip = 0,
        limit = 5,
        filter = {}
    ): Promise<{ data: Cat[]; count: number }> {
        const [data, count] = await Promise.all([
            this.catModel.find(filter).skip(skip).limit(limit).exec(),
            this.catModel.countDocuments(filter).exec(),
        ]);
        return { data, count };
    }
}
/* eslint-disable prettier/prettier */
// src/cats/cats.service.ts
import { Injectable, NotFoundException , InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './schemas/cat.schema';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
// import { CreateCatDto } from './dto/create-cat.dto';
// import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
    // constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) { }
    constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

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

    async create(createCatDto: CreateCatDto): Promise<Cat> {
        try {
            const createCat = new this.catModel(createCatDto);
            return await createCat.save();
        } catch (error) {
            throw new Error(`Failed to create cat: ${error.message}`);
        }
    }

    async update(id: string, updateCatDto: UpdateCatDto): Promise<Cat> {
        try {
            const existingCat = await this.catModel
                .findByIdAndUpdate(id, updateCatDto, { new: true })
                .exec();

            if (!existingCat) {
                throw new NotFoundException(`Cat with ID ${id} not found`);
            }
            return existingCat;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new Error(`Failed to update cat: ${error.message}`);
        }
    }

    async delete(id: string): Promise<{ deleted: boolean; message?: string }> {
        try {
            const result = await this.catModel.deleteOne({ _id: id }).exec();

            if (result.deletedCount === 0) {
                throw new NotFoundException(`Cat with ID ${id} not found`);
            }

            return { deleted: true };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new Error(`Failed to delete cat: ${error.message}`);
        }
    }
}
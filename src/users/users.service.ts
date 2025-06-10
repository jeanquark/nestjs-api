import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async findOne(email: string): Promise<User | undefined> {
    // async findOne(email: string): Promise<User> {
        return this.userModel.find((user: User) => user.email === email);
    }

    // async findAll(): Promise<Cat[]> {
    //         try {
    //             return await this.catModel.find().exec();
    //         } catch (error) {
    //             console.log('error: ', error);
    //             throw new InternalServerErrorException('Failed to retrieve cats');
    //         }
    //     }
}

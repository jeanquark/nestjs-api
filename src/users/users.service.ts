/* eslint-disable prettier/prettier */
import { InternalServerErrorException } from '@nestjs/common'
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { PasswordHelper } from '../auth/helpers/password.helper';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private passwordHelper: PasswordHelper
    ) { }

    // async findOne(email: string): Promise<User | undefined> {
    //     // async findOne(email: string): Promise<User> {
    //     return this.userModel.find((user: User) => user.email === email);
    // }

    async findAll(): Promise<User[]> {
        // return this.catModel.find().exec();
        try {
            console.log('findAll')
            return await this.userModel.find().exec();
        } catch (error) {
            console.log('error: ', error);
            throw new InternalServerErrorException('Failed to retrieve users');
        }
    }

    async findByEmail(email: string): Promise<any> {
        try {
            // return await this.userModel.find((user: User) => user.email === email).exec();
            return await this.userModel.findOne({ email });
        } catch (error: any) {
            console.log('error: ', error);
            throw new InternalServerErrorException('Failed to retrieve user');
        }
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        try {
            // const createUser = new this.userModel(createUserDto);
            // return await createUser.save();

            const { email, password, firstname, lastname } = createUserDto;
            // console.log('email: ', email)
            // console.log('password: ', password)
            // console.log('firstname: ', firstname);

            // Check if user exists
            // const existingUser = await this.userModel.find({ email });
            // if (existingUser) {
            //     throw new ConflictException('Email already exists');
            // }

            // Hash password
            const hashedPassword = await this.passwordHelper.hashPassword(password);

            // Create and save user
            const newUser = new this.userModel({
                email,
                password: hashedPassword,
                firstname,
                lastname,
                is_verified: true
            });

            return await newUser.save();
        } catch (error: any) {
            throw new Error(`Failed to create user: ${error.message}`);
        }
    }
}

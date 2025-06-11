/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { CreateCatDto, UpdateCatDto } from './dto';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';

interface paramObject {
    email: string
}

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    // @Get()
    // findAll(): string {
    //     return 'This action returns all cats';
    // }

    @Get()
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':email')
    findOne(@Param() params: paramObject): Promise<any> {
        // console.log('params: ', params);
        // console.log('params.email: ', params.email);
        // return `This action returns a #$ cat`;
        return this.usersService.findByEmail(params.email);
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
        // return 'This action adds a new cat';
    }
}

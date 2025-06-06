/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Param, Body, Put, Delete, Query } from '@nestjs/common';
import CreateCatDto from './dto/create-cat.dto';
import UpdateCatDto from './dto/update-cat.dto';
// import { CreateCatDto, UpdateCatDto } from './dto';
import { CatsService } from './cats.service';
import { Cat } from './schemas/cat.schema';

@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) { }
    // @Get()
    // findAll(): string {
    //     return 'This action returns all cats';
    // }
    @Get()
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll();
    }

    @Get('paginated')
    async findAllPaginated(
        @Query('page') page = 1,
        @Query('limit') limit = 10
    ) {
        return this.catsService.findAllWithPagination(
            (page - 1) * limit,
            limit
        );
    }

    @Get(':id')
    findOne(@Param() params: any): string {
        console.log(params);
        return `This action returns a #$ cat`;
    }

    @Post()
    async create(@Body() createCatDto: CreateCatDto) {
        return 'This action adds a new cat';
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
        return `This action updates a #${id} cat`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action removes a #${id} cat`;
    }
}

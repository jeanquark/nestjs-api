/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Param, Body, Patch, Delete, Query } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
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
    async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
        return this.catsService.create(createCatDto);
        // return 'This action adds a new cat';
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateCatDto: UpdateCatDto,
    ): Promise<Cat> {
        return this.catsService.update(id, updateCatDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<{ deleted: boolean }> {
        return this.catsService.delete(id);
    }
}

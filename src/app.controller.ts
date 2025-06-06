/* eslint-disable prettier/prettier */
import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  // @Get()
  // getHello() {
  //   return 'Hello, world!';
  // }

  @Get()
  @Render('index')
  root() {
    return { message: 'Welcome to this new NestJS app!' };
  }

  @Get('about')
  @Render('about')
  getAbout() {
    return {
      title: 'About Our Company',
      content: 'We build amazing NestJS applications!',
      version: '1.0.0'
    };
  }
}

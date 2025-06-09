/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { CatsController } from './cats/cats.controller';
// import { CatsService } from './cats/cats.service';
import { CatsModule } from './cats/cats.module';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';

@Module({
  imports: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'client'),
    //   exclude: ['/api/{*test}'],
    //   serveStaticOptions: {
    //     fallthrough: false,
    //   },
    // }),
    ConfigModule.forRoot(),
    // MongooseModule.forRoot('mongodb://127.0.0.1:27017/nestjs'),
    MongooseModule.forRoot(process.env.MONGO_URI_LOCAL!),
    AppModule,
    CatsModule
  ],
  // imports: [MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

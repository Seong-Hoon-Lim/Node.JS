import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import {BlogFileRepository, BlogMongoRepository, BlogRepository} from "./blog.repository";
import {Blog, BlogDocument, BlogSchema} from "./blog.schema";

@Module({
  imports: [
      //몽고 DB 연결 설정
      MongooseModule.forRoot(
          'mongodb+srv://hooney200:hooney200@cluster0.155h4r3.mongodb.net/blog',
      ),
      //몽고 DB 스키마 설정
      MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  controllers: [BlogController],
  //프로바이더 설정
  providers: [BlogService, BlogFileRepository, BlogMongoRepository],
})
export class AppModule {}

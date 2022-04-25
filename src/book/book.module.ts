import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookSchema } from './models/book.models';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'book', schema: BookSchema }])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}

import { BadRequestException, Injectable } from '@nestjs/common';
import { Book, BookDocument } from './models/book.models';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { GetBookQuery } from './dto/get-book.query';

@Injectable()
export class BookService {
  constructor(
    @InjectModel('book') private readonly bookModel: Model<BookDocument>,
  ) {}

  async createBook(book: Book): Promise<Book> {
    const newBook = new this.bookModel(book);
    return (await newBook.save()).toObject();
  }

  async readBook(getBookQuery: GetBookQuery) {
    try {
      const pageOptions = {
        page: getBookQuery.page_number || 1,
        limit: getBookQuery.page_size || 10,
      };
      const skip_books = (pageOptions.page - 1) * pageOptions.limit;
      const books = await this.bookModel
        .find()
        .skip(skip_books)
        .limit(pageOptions.limit);
      return {
        page: pageOptions.page,
        limit: pageOptions.limit,
        size: books.length,
        books,
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async updateBook(id: string, data: Book): Promise<Book> {
    return this.bookModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteBook(id: string) {
    return this.bookModel.findByIdAndRemove(id);
  }

  async findOne(id: string): Promise<Book | undefined> {
    return this.bookModel.findById(id);
  }
}

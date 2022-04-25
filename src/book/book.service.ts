import { Injectable } from '@nestjs/common';
import { Book, BookDocument } from './models/book.models';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BookService {
  constructor(
    @InjectModel('book') private readonly bookModel: Model<BookDocument>,
  ) {}

  async createBook(book: Book): Promise<Book> {
    const newBook = new this.bookModel(book);
    return newBook.save();
  }

  async readBook() {
    return this.bookModel
      .find({})
      .then((book) => {
        return book;
      })
      .catch((err) => console.log(err));
  }

  async updateBook(id, data): Promise<Book> {
    return this.bookModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteBook(id) {
    return this.bookModel.findByIdAndRemove(id);
  }
}

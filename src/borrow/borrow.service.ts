import { BadRequestException, Injectable } from '@nestjs/common';
import { Borrow, BorrowDocument } from './models/borrow.models';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/models/user.models';
import { BorrowCreateDto } from './dto/borrowCreate.dto';
import { UserService } from '../user/user.service';
import { BookService } from '../book/book.service';

@Injectable()
export class BorrowService {
  constructor(
    @InjectModel('borrow') private readonly borrowModel: Model<BorrowDocument>,
    private userService: UserService,
    private bookService: BookService,
  ) {}

  async borrowBook(
    currentUser: User,
    borrowCreateDto: BorrowCreateDto,
  ): Promise<Borrow> {
    try {
      const newBorrow = new this.borrowModel();
      const userRec = await this.userService.findOne(currentUser.username);
      const bookRec = await this.bookService.findOne(borrowCreateDto.book_id);

      newBorrow.user = userRec;
      newBorrow.book = bookRec;
      newBorrow.borrow_date = borrowCreateDto.borrow_date;
      newBorrow.return_date = borrowCreateDto.return_date;

      return newBorrow.save();
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async readBorrow() {
    return this.borrowModel
      .find({})
      .then((borrow) => {
        return borrow;
      })
      .catch((err) => console.log(err));
  }

  async updateBorrow(id, data): Promise<Borrow> {
    return this.borrowModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteBorrow(id) {
    return this.borrowModel.findByIdAndRemove(id);
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { Borrow, BorrowDocument } from './models/borrow.models';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../user/models/user.models';
import { BorrowCreateDto } from './dto/borrowCreate.dto';
import { UserService } from '../user/user.service';
import { BookService } from '../book/book.service';
import { BookDocument } from '../book/models/book.models';

@Injectable()
export class BorrowService {
  constructor(
    @InjectModel('borrow') private readonly borrowModel: Model<BorrowDocument>,
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
    @InjectModel('book') private readonly bookModel: Model<BookDocument>,
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
      newBorrow.borrow_date = new Date();
      newBorrow.regis_return_date = new Date();

      return newBorrow.save();
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async readBorrow(currentUser: User) {
    const userRec = await this.userService.findOne(currentUser.username);

    return this.borrowModel
      .find({
        User: userRec,
        return_date: null,
      })
      .populate({
        path: 'user',
        model: this.userModel,
        select: 'username role',
      })
      .populate({
        path: 'book',
        model: this.bookModel,
        select: 'Name pagesNumber Language Authors',
      })
      .then((borrow) => {
        return borrow;
      })
      .catch((err) => console.log(err));
  }

  async returnBook(id, data): Promise<Borrow> {
    return this.borrowModel.findByIdAndUpdate(id, data, { new: true });
  }
}

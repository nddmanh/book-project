import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Borrow, BorrowDocument } from './models/borrow.models';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../user/models/user.models';
import { BorrowCreateDto } from './dto/borrowCreate.dto';
import { UserService } from '../user/user.service';
import { BookService } from '../book/book.service';
import { BookDocument } from '../book/models/book.models';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class BorrowService {
  private readonly logger = new Logger(BorrowService.name);

  constructor(
    @InjectModel('borrow') private readonly borrowModel: Model<BorrowDocument>,
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
    @InjectModel('book') private readonly bookModel: Model<BookDocument>,
    private userService: UserService,
    private bookService: BookService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    this.logger.debug(
      'Called every day at midnight to check books need to return',
    );
    // Get all borrow rec
    const borrowRecs = await this.getAllBorrow();

    // Compare date and return borrow need return data
    let bookNeedReturn = [];
    const currentDate = new Date();
    if (Array.isArray(borrowRecs)) {
      bookNeedReturn = borrowRecs.filter(
        (borrowRec) =>
          this.calculateTime(currentDate, borrowRec.regis_return_date) < 1,
      );
    }

    // Send to user: Fix me
    console.log('Book need to return: ', bookNeedReturn);
  }

  async borrowBook(currentUser: User, borrowCreateDto: BorrowCreateDto) {
    try {
      const newBorrow = new this.borrowModel();
      const userRec = await this.userService.findOne(currentUser.username);
      if (!userRec) throw new BadRequestException();
      const bookRec = await this.bookService.findOne(borrowCreateDto.book_id);
      if (!bookRec) throw new BadRequestException();
      const borrowRec = await this.borrowModel.find({ book: bookRec });
      if (borrowRec) return 'This book have been borrowed.';

      newBorrow.user = userRec;
      newBorrow.book = bookRec;
      newBorrow.borrow_date = borrowCreateDto.borrow_date;
      newBorrow.regis_return_date = borrowCreateDto.regis_return_date;
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

  async getAllBorrow() {
    return this.borrowModel
      .find({
        return_date: null,
      })
      .populate({
        path: 'user',
        model: this.userModel,
        select: 'username role',
      })
      .then((borrow) => {
        return borrow;
      })
      .catch((err) => console.log(err));
  }

  async returnBook(id, data): Promise<Borrow> {
    return this.borrowModel.findByIdAndUpdate(id, data, { new: true });
  }

  calculateTime(startDate: Date, endDate: Date): number {
    const diffInMs =
      new Date(endDate).valueOf() - new Date(startDate).valueOf();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return diffInDays;
  }
}

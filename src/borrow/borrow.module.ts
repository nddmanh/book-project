import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from '../book/models/book.models';
import { UserSchema } from '../user/models/user.models';
import { BookService } from '../book/book.service';
import { UserService } from '../user/user.service';
import { BorrowController } from './borrow.controller';
import { BorrowService } from './borrow.service';
import { BorrowSchema } from './models/borrow.models';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'borrow', schema: BorrowSchema }]),
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'book', schema: BookSchema }]),
  ],
  controllers: [BorrowController],
  providers: [BorrowService, UserService, BookService],
})
export class BorrowModule {}

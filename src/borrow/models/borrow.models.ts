import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/models/user.models';
import { Book } from '../../book/models/book.models';

export type BorrowDocument = Borrow & Document;

@Schema()
export class Borrow {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Book' })
  book: Book;

  @Prop()
  borrow_date: Date;

  @Prop()
  return_date: Date;

  @Prop({ default: false })
  is_return: boolean;
}

export const BorrowSchema = SchemaFactory.createForClass(Borrow);

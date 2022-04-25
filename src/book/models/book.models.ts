import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop()
  @ApiProperty({ example: 'Harry Potter and the Order of the Phoenix' })
  Name: string;

  @Prop()
  @ApiProperty({ example: 652 })
  pagesNumber: number;

  @Prop()
  @ApiProperty({ example: 9 })
  PublishDay: number;

  @Prop()
  @ApiProperty({ example: 16 })
  PublishMonth: number;

  @Prop()
  @ApiProperty({ example: 2006 })
  PublishYear: number;

  @Prop()
  @ApiProperty({ example: 'Scholastic Inc.' })
  Publisher: string;

  @Prop()
  @ApiProperty({ example: 28062 })
  CountsOfReview: number;

  @Prop()
  @ApiProperty({ example: 'eng' })
  Language: string;

  @Prop()
  @ApiProperty({ example: 'J.K. Rowling' })
  Authors: string;

  @Prop({ default: null })
  @ApiProperty({ example: '0439358078' })
  ISBN: string;

  @Prop()
  @ApiProperty({ example: 4.57 })
  Rating: number;

  @Prop()
  @ApiProperty({ example: '1:159960' })
  RatingDist1: string;

  @Prop()
  @ApiProperty({ example: '2:159960' })
  RatingDist2: string;

  @Prop()
  @ApiProperty({ example: '3:159960' })
  RatingDist3: string;

  @Prop()
  @ApiProperty({ example: '4:159960' })
  RatingDist4: string;

  @Prop()
  @ApiProperty({ example: '5:159960' })
  RatingDist5: string;

  @Prop()
  @ApiProperty({ example: 'total:2298124' })
  RatingDistTotal: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);

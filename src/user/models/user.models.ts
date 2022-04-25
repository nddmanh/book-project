import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  @ApiProperty({ example: 'Nguyen Duc Manh' })
  username: string;

  @Prop({ required: true })
  @ApiProperty({ example: 'abcdxyz' })
  password: string;

  @Prop({ default: 'user' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

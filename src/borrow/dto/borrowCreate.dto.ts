import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class BorrowCreateDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '6266bcc8f272379129a680ba' })
  book_id: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: '2022-04-26T08:02:41.669Z' })
  borrow_date: Date;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: '2022-04-28T08:02:41.669Z' })
  regis_return_date: Date;
}

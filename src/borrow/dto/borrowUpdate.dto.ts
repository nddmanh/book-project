import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class BorrowUpdateDto {
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: '2022-04-28T08:02:41.669Z' })
  return_date: Date;
}

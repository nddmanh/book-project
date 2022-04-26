import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetBookQuery {
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ example: 1 })
  page_number?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ example: 10 })
  page_size?: number = 10;
}

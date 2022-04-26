import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'nddmanh' })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'abcdxyz' })
  password: string;
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { Borrow } from './models/borrow.models';
import { BorrowUpdateDto } from './dto/borrowUpdate.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetCurrentUser } from '../auth/decorators/get-current-user.decorator';
import { BorrowCreateDto } from './dto/borrowCreate.dto';

@ApiTags('borrow')
@Controller('borrows')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @Post()
  @ApiOkResponse({ description: 'Insert new borrow successfully' })
  async borrowBook(
    @GetCurrentUser() currentUser,
    @Body() borrowCreateDto: BorrowCreateDto,
  ) {
    return this.borrowService.borrowBook(currentUser, borrowCreateDto);
  }

  @Get()
  readBorrow(@GetCurrentUser() currentUser) {
    return this.borrowService.readBorrow(currentUser);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Return book successfully' })
  async returnBook(
    @Param('id') id: string,
    @Body() updateData: BorrowUpdateDto,
  ): Promise<Borrow> {
    return this.borrowService.returnBook(id, updateData);
  }
}

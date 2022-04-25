import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
  readBorrow() {
    return this.borrowService.readBorrow();
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Update borrow successfully' })
  async updateBorrow(
    @Param('id') id: string,
    @Body() updateData: BorrowUpdateDto,
  ): Promise<Borrow> {
    return this.borrowService.updateBorrow(id, updateData);
  }

  @Delete(':id')
  async deleteBorrow(@Param('id') id: string) {
    return this.borrowService.deleteBorrow(id);
  }
}

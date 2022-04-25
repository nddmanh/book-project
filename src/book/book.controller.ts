import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './models/book.models';
import { BookUpdateDto } from './dto/bookUpdate.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('book')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiOkResponse({ description: 'Insert new book successfully' })
  async createBook(@Body() bookDto: Book) {
    return this.bookService.createBook(bookDto);
  }

  @Get()
  readBook() {
    return this.bookService.readBook();
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Update book successfully' })
  async updateBook(
    @Param('id') id: string,
    @Body() updateData: BookUpdateDto,
  ): Promise<Book> {
    return this.bookService.updateBook(id, updateData);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string) {
    return this.bookService.deleteBook(id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './models/book.models';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetBookQuery } from './dto/get-book.query';

@ApiBearerAuth()
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
  @ApiOkResponse({ description: 'Get books successfully' })
  readBook(@Query() getBookQuery: GetBookQuery) {
    return this.bookService.readBook(getBookQuery);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Update book successfully' })
  async updateBook(
    @Param('id') id: string,
    @Body() updateData: Book,
  ): Promise<Book> {
    return this.bookService.updateBook(id, updateData);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Delete book successfully' })
  async deleteBook(@Param('id') id: string) {
    return this.bookService.deleteBook(id);
  }
}

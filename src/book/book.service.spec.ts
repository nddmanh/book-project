import { Test, TestingModule } from '@nestjs/testing';
import { Book, BookSchema } from './models/book.models';
import { BookService } from './book.service';
import { getModelToken } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
const book: Book = {
  Name: 'Harry Potter and the Order of the Phoenix',
  pagesNumber: 652,
  PublishDay: 9,
  PublishMonth: 16,
  PublishYear: 2006,
  Publisher: 'Scholastic Inc.',
  CountsOfReview: 28062,
  Language: 'eng',
  Authors: 'J.K. Rowling',
  ISBN: '0439358078',
  Rating: 4.57,
  RatingDist1: '1:159960',
  RatingDist2: '2:159960',
  RatingDist3: '3:159960',
  RatingDist4: '4:159960',
  RatingDist5: '5:159960',
  RatingDistTotal: 'total:2298124',
};

describe('BookService', () => {
  let bookService: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          cache: true,
        }),
        MongooseModule.forRoot(
          'mongodb+srv://nddmanh:manh123456@book-project.igksx.mongodb.net/book-project?retryWrites=true&w=majority',
        ),
        MongooseModule.forFeature([{ name: 'book', schema: BookSchema }]),
      ],
      providers: [
        BookService,
        {
          provide: getModelToken(Book),
          useValue: {
            createBook: jest.fn(() => book),
          },
        },
      ],
    }).compile();

    bookService = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(bookService).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a book record', async () => {
      const bookDto: Book = {
        Name: 'Harry Potter and the Order of the Phoenix',
        pagesNumber: 652,
        PublishDay: 9,
        PublishMonth: 16,
        PublishYear: 2006,
        Publisher: 'Scholastic Inc.',
        CountsOfReview: 28062,
        Language: 'eng',
        Authors: 'J.K. Rowling',
        ISBN: '0439358078',
        Rating: 4.57,
        RatingDist1: '1:159960',
        RatingDist2: '2:159960',
        RatingDist3: '3:159960',
        RatingDist4: '4:159960',
        RatingDist5: '5:159960',
        RatingDistTotal: 'total:2298124',
      };
      const retVal = await bookService.createBook(bookDto);
      delete retVal['__v'];
      delete retVal['_id'];
      expect(retVal).toEqual(book);
    });
  });
});

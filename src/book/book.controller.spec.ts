import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Book } from './models/book.models';

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

describe('BookController', () => {
  let bookController: BookController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        BookService,
        {
          provide: BookService,
          useValue: {
            createBook: jest.fn().mockImplementation((book: Book) => book),
          },
        },
      ],
    }).compile();

    bookController = app.get<BookController>(BookController);
  });

  it('should be defined', () => {
    expect(bookController).toBeDefined();
  });

  it('should make a new cat', async () => {
    expect(
      await bookController.createBook({
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
      }),
    ).toEqual(book);
  });
});

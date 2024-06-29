import {inject, injectable} from "inversify";
import {BooksService} from "../services/books.service";
import {Request, Response} from "express";
import {HTTP_STATUS_CODES} from "../utils/http-status-codes";
import {CreateBookInputTypes} from "../types/books.types";
import {createBookBody} from "../utils/books.utils";

@injectable()
export class BooksController {
    constructor(
        @inject(BooksService) protected booksService: BooksService) {
    }
    async getAllBooks (req: Request, res: Response) {
        const books = await this.booksService.getAllBooks();
        res.send(books);
        res.send(books);
    }
    async getBookById(req: Request, res: Response) {
        const bookId = req.params.bookId;
        const book = await this.booksService.getBookById(bookId);
        if (book) {
            res.send(book);
            return
        }
        res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND)
    }
    async createBook (req: Request, res: Response) {
        const body: CreateBookInputTypes = createBookBody(req);
        const newBook = await this.booksService.createBook(body)

        if(newBook){
            res.status(HTTP_STATUS_CODES.CREATED).send(newBook)
            return;
        }
        res.status(HTTP_STATUS_CODES.BAD_REQUEST)
    }
    async updateBookById (req: Request, res: Response) {
        const body = createBookBody(req);
        const bookId: string = req.params.bookId;
        const updatedBook = await this.booksService.updateBookById(bookId, body);
        if (!updatedBook) {
            res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);
            return
        }
        res.status(HTTP_STATUS_CODES.OK).send(updatedBook)
    }
    async deleteBook (req: Request, res: Response) {
        const bookId = req.params.bookId;
        const isBookDeleted = await this.booksService.deleteBookById(bookId);
        if (!isBookDeleted) {
            res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND)
            return
        }
        res.sendStatus(HTTP_STATUS_CODES.NO_CONTENT);
        return

    }
}
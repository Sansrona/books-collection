import {inject, injectable} from "inversify";
import { CreateBookInputTypes} from "../types/books.types";
import {BooksRepository} from "../repositories/books.repository";

@injectable()
export class BooksService {
    constructor(
        @inject(BooksRepository) protected booksRepository: BooksRepository) {
    }
    async getAllBooks() {
        const books = await this.booksRepository.getAllBooks();
        if(books){
        return books
        }
        return null;
    }
    async getBookById(bookId: string) {
        const book = await this.booksRepository.getBookById(bookId)
        if(book){
            return book
        }
        return null
    }
    async createBook({genres,publicationDate,title,author}: CreateBookInputTypes){
            const newBook = {
                genres,
                publicationDate,
                title,
                author,
                };
            const createdBookId = await this.booksRepository.createBook(newBook);
            return {
                id: createdBookId.toString(),
                genres,
                publicationDate,
                title,
                author,
            };
    }
    async updateBookById(bookId: string, {
        genres,
        publicationDate,
        title,
        author
    }: CreateBookInputTypes) {
        const body = {
            genres,
            publicationDate,
            title,
            author}
        const isModified = await this.booksRepository.updateBookById(bookId, body);
        if(isModified) {
            return this.booksRepository.getBookById(bookId);
        }
        return null
        }
    async deleteBookById(bookId: string){
        return this.booksRepository.deleteBookById(bookId);
    }

}
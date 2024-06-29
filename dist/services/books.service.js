"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
const inversify_1 = require("inversify");
const books_repository_1 = require("../repositories/books.repository");
let BooksService = class BooksService {
    constructor(booksRepository) {
        this.booksRepository = booksRepository;
    }
    getAllBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            const books = yield this.booksRepository.getAllBooks();
            if (books) {
                return books;
            }
            return null;
        });
    }
    getBookById(bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield this.booksRepository.getBookById(bookId);
            if (book) {
                return book;
            }
            return null;
        });
    }
    createBook({ genres, publicationDate, title, author }) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBook = {
                genres,
                publicationDate,
                title,
                author,
            };
            const createdBookId = yield this.booksRepository.createBook(newBook);
            return {
                id: createdBookId.toString(),
                genres,
                publicationDate,
                title,
                author,
            };
        });
    }
    updateBookById(bookId, { genres, publicationDate, title, author }) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                genres,
                publicationDate,
                title,
                author
            };
            const isModified = yield this.booksRepository.updateBookById(bookId, body);
            if (isModified) {
                return this.booksRepository.getBookById(bookId);
            }
            return null;
        });
    }
    deleteBookById(bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.booksRepository.deleteBookById(bookId);
        });
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(books_repository_1.BooksRepository)),
    __metadata("design:paramtypes", [books_repository_1.BooksRepository])
], BooksService);

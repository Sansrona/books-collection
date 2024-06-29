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
exports.BooksController = void 0;
const inversify_1 = require("inversify");
const books_service_1 = require("../services/books.service");
const http_status_codes_1 = require("../utils/http-status-codes");
const books_utils_1 = require("../utils/books.utils");
let BooksController = class BooksController {
    constructor(booksService) {
        this.booksService = booksService;
    }
    getAllBooks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const books = yield this.booksService.getAllBooks();
            res.send(books);
        });
    }
    getBookById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookId = req.params.bookId;
            const book = yield this.booksService.getBookById(bookId);
            if (book) {
                res.send(book);
                return;
            }
            res.sendStatus(http_status_codes_1.HTTP_STATUS_CODES.NOT_FOUND);
        });
    }
    createBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = (0, books_utils_1.createBookBody)(req);
            const newBook = yield this.booksService.createBook(body);
            if (newBook) {
                res.status(http_status_codes_1.HTTP_STATUS_CODES.CREATED).send(newBook);
                return;
            }
            res.status(http_status_codes_1.HTTP_STATUS_CODES.BAD_REQUEST);
        });
    }
    updateBookById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = (0, books_utils_1.createBookBody)(req);
            const bookId = req.params.bookId;
            const updatedBook = yield this.booksService.updateBookById(bookId, body);
            if (!updatedBook) {
                res.sendStatus(http_status_codes_1.HTTP_STATUS_CODES.NOT_FOUND);
                return;
            }
            res.status(http_status_codes_1.HTTP_STATUS_CODES.OK).send(updatedBook);
        });
    }
    deleteBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookId = req.params.bookId;
            const isBookDeleted = yield this.booksService.deleteBookById(bookId);
            if (!isBookDeleted) {
                res.sendStatus(http_status_codes_1.HTTP_STATUS_CODES.NOT_FOUND);
                return;
            }
            res.sendStatus(http_status_codes_1.HTTP_STATUS_CODES.NO_CONTENT);
            return;
        });
    }
};
exports.BooksController = BooksController;
exports.BooksController = BooksController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(books_service_1.BooksService)),
    __metadata("design:paramtypes", [books_service_1.BooksService])
], BooksController);

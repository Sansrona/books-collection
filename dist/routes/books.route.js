"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRouter = void 0;
const express_1 = require("express");
const basic_auth_middleware_1 = require("../middlewares/basic-auth.middleware");
const books_validation_middleware_1 = require("../middlewares/books-validation.middleware");
const root_1 = require("../compositionRoots/root");
const books_controller_1 = require("../controllers/books.controller");
exports.booksRouter = (0, express_1.Router)();
const booksController = root_1.myContainer.get(books_controller_1.BooksController);
// get all books
exports.booksRouter.get('/', booksController.getAllBooks.bind(booksController));
//get book by id
exports.booksRouter.get('/:bookId', books_validation_middleware_1.BookIdParamValidationMiddlewares, booksController.getBookById.bind(booksController));
// create new book
exports.booksRouter.post('/', books_validation_middleware_1.BooksValidationMiddlewares, booksController.createBook.bind(booksController));
// update book by id
exports.booksRouter.put('/:bookId', books_validation_middleware_1.BooksValidationMiddlewares, books_validation_middleware_1.BookIdParamValidationMiddlewares, booksController.updateBookById.bind(booksController));
// delete book by id
exports.booksRouter.delete('/:bookId', basic_auth_middleware_1.globalBasicAuthMiddleware, books_validation_middleware_1.BookIdParamValidationMiddlewares, booksController.deleteBook.bind(booksController));

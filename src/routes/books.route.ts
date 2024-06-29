import {Router} from "express";
import {globalBasicAuthMiddleware} from "../middlewares/basic-auth.middleware";
import {
    BookIdParamValidationMiddleware, BookIdParamValidationMiddlewares,
    BooksValidationMiddlewares
} from "../middlewares/books-validation.middleware";
import {myContainer} from "../compositionRoots/root";
import {BooksController} from "../controllers/books.controller";


export const booksRouter = Router();

const booksController = myContainer.get(BooksController);

// get all books
booksRouter.get('/', booksController.getAllBooks.bind(booksController))
//get book by id
booksRouter.get('/:bookId',BookIdParamValidationMiddlewares,booksController.getBookById.bind(booksController) )
// create new book
booksRouter.post('/',BooksValidationMiddlewares, booksController.createBook.bind(booksController))
// update book by id
booksRouter.put('/:bookId',BooksValidationMiddlewares, BookIdParamValidationMiddlewares, booksController.updateBookById.bind(booksController))
// delete book by id
booksRouter.delete('/:bookId', globalBasicAuthMiddleware, BookIdParamValidationMiddlewares,booksController.deleteBook.bind(booksController))



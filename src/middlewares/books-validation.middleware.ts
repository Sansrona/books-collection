import {body, param} from "express-validator";
import {globalBasicAuthMiddleware} from "./basic-auth.middleware";
import {globalInputValidatorMiddleware} from "./input-validation.middleware";
import {ObjectId} from "mongodb";

export const BooksTitleValidationMiddleware= body('title')
    .trim()
    .notEmpty()
    .escape()
    .isLength({max: 30})
    .withMessage('Invalid book`s title')
export const BooksAuthorValidationMiddleware =  body('author')
    .trim()
    .notEmpty()
    .escape()
    .isLength({max:100})
    .withMessage('Invalid book`s author')
export const BooksPublicationDateValidationMiddleware =   body('publicationDate')
    .trim()
    .notEmpty()
    .escape()
    .isLength({max: 100})
    .withMessage('Invalid book`s publicationDate')

export const BookIdParamValidationMiddleware = param('bookId')
    .trim()
    .custom((value) => {
        return ObjectId.isValid(value)
    })
    .withMessage('wrong id');

export const BooksGenresValidationMiddleware= body('genres')
    .trim()
    .isArray({min:0})
    .escape()
    .withMessage('Invalid book genres')

export const BooksValidationMiddlewares = [
    globalBasicAuthMiddleware,
    BooksTitleValidationMiddleware,
    BooksAuthorValidationMiddleware,
    BooksPublicationDateValidationMiddleware,
    BooksGenresValidationMiddleware,
    globalInputValidatorMiddleware,
]

export const BookIdParamValidationMiddlewares = [
    BookIdParamValidationMiddleware,
    globalInputValidatorMiddleware
]

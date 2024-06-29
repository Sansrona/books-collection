"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookIdParamValidationMiddlewares = exports.BooksValidationMiddlewares = exports.BooksGenresValidationMiddleware = exports.BookIdParamValidationMiddleware = exports.BooksPublicationDateValidationMiddleware = exports.BooksAuthorValidationMiddleware = exports.BooksTitleValidationMiddleware = void 0;
const express_validator_1 = require("express-validator");
const basic_auth_middleware_1 = require("./basic-auth.middleware");
const input_validation_middleware_1 = require("./input-validation.middleware");
const mongodb_1 = require("mongodb");
exports.BooksTitleValidationMiddleware = (0, express_validator_1.body)('title')
    .trim()
    .notEmpty()
    .escape()
    .isLength({ max: 30 })
    .withMessage('Invalid book`s title');
exports.BooksAuthorValidationMiddleware = (0, express_validator_1.body)('author')
    .trim()
    .notEmpty()
    .escape()
    .isLength({ max: 100 })
    .withMessage('Invalid book`s author');
exports.BooksPublicationDateValidationMiddleware = (0, express_validator_1.body)('publicationDate')
    .trim()
    .notEmpty()
    .escape()
    .isLength({ max: 100 })
    .withMessage('Invalid book`s publicationDate');
exports.BookIdParamValidationMiddleware = (0, express_validator_1.param)('bookId')
    .trim()
    .custom((value) => {
    return mongodb_1.ObjectId.isValid(value);
})
    .withMessage('wrong id');
exports.BooksGenresValidationMiddleware = (0, express_validator_1.body)('genres')
    .trim()
    .isArray({ min: 0 })
    .escape()
    .withMessage('Invalid book genres');
exports.BooksValidationMiddlewares = [
    basic_auth_middleware_1.globalBasicAuthMiddleware,
    exports.BooksTitleValidationMiddleware,
    exports.BooksAuthorValidationMiddleware,
    exports.BooksPublicationDateValidationMiddleware,
    exports.BooksGenresValidationMiddleware,
    input_validation_middleware_1.globalInputValidatorMiddleware,
];
exports.BookIdParamValidationMiddlewares = [
    exports.BookIdParamValidationMiddleware,
    input_validation_middleware_1.globalInputValidatorMiddleware
];

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidationMiddlewares = exports.UsersRoleValidationMiddlewares = exports.UsersValidationMiddlewares = exports.UserIdParamValidationMiddleware = exports.UsersRoleValidationMiddleware = exports.UsersPasswordValidationMiddleware = exports.UsersEmailValidationMiddleware = exports.UserUsernameValidationMiddleware = void 0;
const express_validator_1 = require("express-validator");
const basic_auth_middleware_1 = require("./basic-auth.middleware");
const input_validation_middleware_1 = require("./input-validation.middleware");
const mongodb_1 = require("mongodb");
exports.UserUsernameValidationMiddleware = (0, express_validator_1.body)('username')
    .trim()
    .notEmpty()
    .escape()
    .isLength({ max: 10, min: 3 })
    .custom(login => {
    const pattern = /^[a-zA-Z0-9_-]*$/;
    return pattern.test(login);
})
    .withMessage('Invalid user`s login');
exports.UsersEmailValidationMiddleware = (0, express_validator_1.body)('email')
    .trim()
    .notEmpty()
    .escape()
    .custom((email) => {
    const pattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return pattern.test(email);
})
    .withMessage('Invalid user`s email');
exports.UsersPasswordValidationMiddleware = (0, express_validator_1.body)('password')
    .trim()
    .notEmpty()
    .escape()
    .isLength({ max: 20, min: 6 })
    .withMessage('Invalid user`s password');
exports.UsersRoleValidationMiddleware = (0, express_validator_1.body)('role')
    .trim()
    .notEmpty()
    .escape()
    .isNumeric()
    .withMessage('Invalid user`s role');
exports.UserIdParamValidationMiddleware = (0, express_validator_1.param)('userId')
    .trim()
    .custom((value) => {
    return mongodb_1.ObjectId.isValid(value);
})
    .withMessage('wrong id');
exports.UsersValidationMiddlewares = [
    exports.UserUsernameValidationMiddleware,
    exports.UsersEmailValidationMiddleware,
    exports.UsersPasswordValidationMiddleware,
    input_validation_middleware_1.globalInputValidatorMiddleware,
];
exports.UsersRoleValidationMiddlewares = [
    basic_auth_middleware_1.globalBasicAuthMiddleware,
    exports.UserIdParamValidationMiddleware,
    exports.UsersRoleValidationMiddleware,
    input_validation_middleware_1.globalInputValidatorMiddleware,
];
exports.AuthValidationMiddlewares = [
    exports.UserUsernameValidationMiddleware,
    exports.UsersPasswordValidationMiddleware,
    input_validation_middleware_1.globalInputValidatorMiddleware,
];

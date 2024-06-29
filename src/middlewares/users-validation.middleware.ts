import {body, param} from "express-validator";
import {globalBasicAuthMiddleware} from "./basic-auth.middleware";
import {globalInputValidatorMiddleware} from "./input-validation.middleware"
import {ObjectId} from "mongodb";

export const UserUsernameValidationMiddleware= body('username')
    .trim()
    .notEmpty()
    .escape()
    .isLength({max: 10, min: 3})
    .custom(login => {
        const pattern = /^[a-zA-Z0-9_-]*$/;
        return pattern.test(login)
    })
    .withMessage('Invalid user`s login')
export const UsersEmailValidationMiddleware =  body('email')
    .trim()
    .notEmpty()
    .escape()
    .custom((email) => {
        const pattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
        return pattern.test(email);
    })
    .withMessage('Invalid user`s email')
export const UsersPasswordValidationMiddleware =   body('password')
    .trim()
    .notEmpty()
    .escape()
    .isLength({max: 20, min: 6})
    .withMessage('Invalid user`s password')

export const UsersRoleValidationMiddleware =   body('role')
    .trim()
    .notEmpty()
    .escape()
    .isNumeric()
    .withMessage('Invalid user`s role')

export const UserIdParamValidationMiddleware = param('userId')
    .trim()
    .custom((value) => {
    return ObjectId.isValid(value)
})
    .withMessage('wrong id');


export const UsersValidationMiddlewares = [
    UserUsernameValidationMiddleware,
    UsersEmailValidationMiddleware,
    UsersPasswordValidationMiddleware,
    globalInputValidatorMiddleware,
]

export const UsersRoleValidationMiddlewares = [
    globalBasicAuthMiddleware,
    UserIdParamValidationMiddleware,
    UsersRoleValidationMiddleware,
    globalInputValidatorMiddleware,
]
export const AuthValidationMiddlewares = [
    UserUsernameValidationMiddleware,
    UsersPasswordValidationMiddleware,
    globalInputValidatorMiddleware,
]


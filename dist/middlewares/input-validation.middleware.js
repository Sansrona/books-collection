"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalInputValidatorMiddleware = void 0;
const express_validator_1 = require("express-validator");
const globalInputValidatorMiddleware = (req, res, next) => {
    const result = (0, express_validator_1.validationResult)(req);
    if (result.isEmpty()) {
        next();
    }
    else {
        res.status(400).send({
            errorsMessages: result.array({ onlyFirstError: true }).map((err) => {
                switch (err.type) {
                    case "field":
                        return {
                            field: err.path,
                            message: err.msg
                        };
                    default:
                        return {
                            field: '---',
                            message: err.msg
                        };
                }
            })
        });
    }
};
exports.globalInputValidatorMiddleware = globalInputValidatorMiddleware;

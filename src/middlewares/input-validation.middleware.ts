import {query, ValidationError, validationResult} from 'express-validator';
import {Response, Request, NextFunction} from "express";


export const globalInputValidatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);
    if(result.isEmpty()){
        next();
    } else {
        res.status(400).send({
            errorsMessages: result.array({onlyFirstError: true}).map((err: ValidationError) => {
                switch (err.type) {
                    case "field":
                        return {
                            field: err.path,
                            message: err.msg
                        }
                    default:
                        return {
                            field: '---',
                            message: err.msg
                        }
                }
            })
        })
    }

}


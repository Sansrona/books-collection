
import {Response, Request, NextFunction} from "express";
import {HTTP_STATUS_CODES} from "../utils/http-status-codes";


export const globalBasicAuthMiddleware = (req:Request, res:Response, next: NextFunction) => {
    const role = req.headers.role;
    if(!role){
        return res.sendStatus(HTTP_STATUS_CODES.UNAUTHORIZED);
    }
    if (Number(role) !== 1) {
        return res.status(403).json({error: 'Access denied'});
    }
    next();
    return;
}



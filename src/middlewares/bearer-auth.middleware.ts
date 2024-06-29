
import {Response, Request, NextFunction} from "express";
import {HTTP_STATUS_CODES} from "../utils/http-status-codes";
import dotenv from "dotenv";
import {myContainer} from "../compositionRoots/root";
import {UsersRepository} from "../repositories/users.repository";
import {JwtService} from "../services/jwt.service";

dotenv.config()
const password = process.env.PASSWORD || 'qwerty'
const login = process.env.LOGIN || 'admin'

export const globalBasicAuthMiddleware = (req:Request, res:Response, next: NextFunction) => {
    const auth = {login, password}
    if(req.headers.authorization){
        const [authHeader, b64auth] = (req.headers.authorization || '').split(' ');
        const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')
    if (authHeader === 'Basic' && login && password && login === auth.login && password === auth.password) {
        return next()
    }
    }
    res.sendStatus(HTTP_STATUS_CODES.UNAUTHORIZED);
}

export const globalBearerAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
        if(req.headers.authorization){
            const [authHeader, token] = (req.headers.authorization || '').split(' ');
            if(authHeader === 'Bearer'){
                const jwtService = myContainer.get(JwtService);
                const userId = await jwtService.decodeJWTToken(token);
                if(userId){
                    const usersRepository = myContainer.get(UsersRepository);
                    req.user = await usersRepository.getUserById(userId);
                    next();
                    return;
                }
            }
        }
            res.sendStatus(HTTP_STATUS_CODES.UNAUTHORIZED)
}

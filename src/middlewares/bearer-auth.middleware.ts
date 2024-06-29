
import {Response, Request, NextFunction} from "express";
import {HTTP_STATUS_CODES} from "../utils/http-status-codes";
import dotenv from "dotenv";
import {myContainer} from "../compositionRoots/root";
import {UsersRepository} from "../repositories/users.repository";
import {JwtService} from "../services/jwt.service";

dotenv.config()
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

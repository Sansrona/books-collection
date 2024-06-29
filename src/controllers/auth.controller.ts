import { injectable, inject } from "inversify";
import {JwtService} from "../services/jwt.service";
import {UsersService} from "../services/users.service";
import {AuthService} from "../services/auth.service";
import {Request, Response} from "express";
import {HTTP_STATUS_CODES} from "../utils/http-status-codes";
import {createErrorMessage} from "../utils";

@injectable()
export class AuthController{
    constructor(
        @inject(JwtService) protected jwtService: JwtService,
        @inject(UsersService) protected usersService: UsersService,
        @inject(AuthService) protected authService: AuthService,
        ) {
    }
    async login(req: Request, res: Response){
        const username = req.body.username;
        const password = req.body.password;
        const result = await this.usersService.checkCredentials(username, password);
        if (result) {
            const accessToken = await this.jwtService.createAccessJWTToken(result._id);
            res.send({accessToken: accessToken})
            return;
        }
        res.sendStatus(HTTP_STATUS_CODES.UNAUTHORIZED)
    }
    async registrationConfirmation(req:Request, res: Response) {
        const code = req.body.code;
        const isConfirmed = await this.authService.verifyConfirmationCode(code);
        if(isConfirmed){
            res.sendStatus(HTTP_STATUS_CODES.NO_CONTENT)
            return;
        }
        const error = createErrorMessage('code already confirmed', 'code')
        res.status(HTTP_STATUS_CODES.BAD_REQUEST).send(error)
    }
    async registration(req:Request, res: Response) {
        const body = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        };
        const user = await this.authService.registerUser(body);
        if(user){
            res.status(HTTP_STATUS_CODES.OK).send(user);
            return;
        }
        return res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);
    }
    async updateUserRole(req:Request, res: Response){
        const role = req.body.role;
        const userId = req.params.userId;

        const user = await this.usersService.updateUsersRole(userId, role)
        if(user){
            res.send(user);
            return;
        }
        res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);

    }
    async getMe (req: Request, res: Response){
        const user = req.user;
        if(user){
            res.send({
                email: user.email,
                username: user.username,
                userId: user.id,
            })
            return;
        }
        res.sendStatus(HTTP_STATUS_CODES.UNAUTHORIZED);
    }
}
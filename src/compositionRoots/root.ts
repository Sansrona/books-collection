import "reflect-metadata";
import { Container } from "inversify";

import {BooksService} from "../services/books.service";
import {BooksRepository} from "../repositories/books.repository";
import {BooksController} from "../controllers/books.controller";
import {JwtService} from "../services/jwt.service";
import {UsersService} from "../services/users.service";
import {UsersRepository} from "../repositories/users.repository";

import {AuthController} from "../controllers/auth.controller";
import {AuthService} from "../services/auth.service";


const myContainer = new Container();



myContainer.bind<BooksController>(BooksController).to(BooksController);
myContainer.bind<BooksService>(BooksService).to(BooksService);
myContainer.bind<BooksRepository>(BooksRepository).to(BooksRepository);


myContainer.bind<JwtService>(JwtService).to(JwtService);

myContainer.bind<UsersService>(UsersService).to(UsersService);
myContainer.bind<UsersRepository>(UsersRepository).to(UsersRepository);

myContainer.bind<AuthController>(AuthController).to(AuthController);
myContainer.bind<AuthService>(AuthService).to(AuthService);

export {myContainer};
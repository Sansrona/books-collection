"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidPaths = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const books_route_1 = require("./routes/books.route");
const db_1 = require("./db");
const auth_route_1 = require("./routes/auth.route");
exports.app = (0, express_1.default)();
const port = process.env.PORT || 3000;
exports.ValidPaths = {
    books: '/books',
    users: '/users',
};
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded());
exports.app.use((0, cookie_parser_1.default)());
exports.app.set('trust proxy', true);
exports.app.use(exports.ValidPaths.books, books_route_1.booksRouter);
exports.app.use(exports.ValidPaths.users, auth_route_1.authRouter);
exports.app.get('/', (req, res) => {
    res.send('hello world');
});
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.runDb)();
    if (process.env.NODE_ENV !== 'test') {
        exports.app.listen(port, () => console.log(`Listening on port ${port}`));
    }
});
startApp();

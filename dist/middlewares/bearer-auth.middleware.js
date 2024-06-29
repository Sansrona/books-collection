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
exports.globalBearerAuthMiddleware = void 0;
const http_status_codes_1 = require("../utils/http-status-codes");
const dotenv_1 = __importDefault(require("dotenv"));
const root_1 = require("../compositionRoots/root");
const users_repository_1 = require("../repositories/users.repository");
const jwt_service_1 = require("../services/jwt.service");
dotenv_1.default.config();
const globalBearerAuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.headers.authorization) {
        const [authHeader, token] = (req.headers.authorization || '').split(' ');
        if (authHeader === 'Bearer') {
            const jwtService = root_1.myContainer.get(jwt_service_1.JwtService);
            const userId = yield jwtService.decodeJWTToken(token);
            if (userId) {
                const usersRepository = root_1.myContainer.get(users_repository_1.UsersRepository);
                req.user = yield usersRepository.getUserById(userId);
                next();
                return;
            }
        }
    }
    res.sendStatus(http_status_codes_1.HTTP_STATUS_CODES.UNAUTHORIZED);
});
exports.globalBearerAuthMiddleware = globalBearerAuthMiddleware;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const inversify_1 = require("inversify");
const jwt_service_1 = require("../services/jwt.service");
const users_service_1 = require("../services/users.service");
const auth_service_1 = require("../services/auth.service");
const http_status_codes_1 = require("../utils/http-status-codes");
const utils_1 = require("../utils");
let AuthController = class AuthController {
    constructor(jwtService, usersService, authService) {
        this.jwtService = jwtService;
        this.usersService = usersService;
        this.authService = authService;
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const username = req.body.username;
            const password = req.body.password;
            const result = yield this.usersService.checkCredentials(username, password);
            if (result) {
                const accessToken = yield this.jwtService.createAccessJWTToken(result._id);
                res.send({ accessToken: accessToken });
                return;
            }
            res.sendStatus(http_status_codes_1.HTTP_STATUS_CODES.UNAUTHORIZED);
        });
    }
    registrationConfirmation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const code = req.body.code;
            const isConfirmed = yield this.authService.verifyConfirmationCode(code);
            if (isConfirmed) {
                res.sendStatus(http_status_codes_1.HTTP_STATUS_CODES.NO_CONTENT);
                return;
            }
            const error = (0, utils_1.createErrorMessage)('code already confirmed', 'code');
            res.status(http_status_codes_1.HTTP_STATUS_CODES.BAD_REQUEST).send(error);
        });
    }
    registration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            };
            const user = yield this.authService.registerUser(body);
            if (user) {
                res.status(http_status_codes_1.HTTP_STATUS_CODES.OK).send(user);
                return;
            }
            return res.sendStatus(http_status_codes_1.HTTP_STATUS_CODES.BAD_REQUEST);
        });
    }
    updateUserRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = req.body.role;
            const userId = req.params.userId;
            const user = yield this.usersService.updateUsersRole(userId, role);
            if (user) {
                res.send(user);
                return;
            }
            res.sendStatus(http_status_codes_1.HTTP_STATUS_CODES.BAD_REQUEST);
        });
    }
    getMe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            if (user) {
                res.send({
                    email: user.email,
                    username: user.username,
                    userId: user.id,
                });
                return;
            }
            res.sendStatus(http_status_codes_1.HTTP_STATUS_CODES.UNAUTHORIZED);
        });
    }
};
exports.AuthController = AuthController;
exports.AuthController = AuthController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(jwt_service_1.JwtService)),
    __param(1, (0, inversify_1.inject)(users_service_1.UsersService)),
    __param(2, (0, inversify_1.inject)(auth_service_1.AuthService)),
    __metadata("design:paramtypes", [jwt_service_1.JwtService,
        users_service_1.UsersService,
        auth_service_1.AuthService])
], AuthController);

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const inversify_1 = require("inversify");
const users_repository_1 = require("../repositories/users.repository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongodb_1 = require("mongodb");
const uuid_1 = require("uuid");
const add_1 = __importDefault(require("date-fns/add"));
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    createUser(data, isCreatingByAdmin) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUserBody = yield this.createUserInputDto(data, isCreatingByAdmin);
            const newUser = yield this.usersRepository.createUser(newUserBody);
            return {
                userProfile: {
                    username: newUser.userProfile.username,
                    email: newUserBody.userProfile.email,
                    id: newUser._id.toString(),
                },
                userConfirmation: newUser.userConfirmation
            };
        });
    }
    checkCredentials(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.getUserByUsername(username);
            if (!user)
                return null;
            const passwordHash = yield this._generateHash(password, user.userProfile.passwordSalt);
            return user.userProfile.passwordHash === passwordHash ? user : null;
        });
    }
    getUserByCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usersRepository.getUserByCode(code);
        });
    }
    updateUsersConfirmationStatus(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usersRepository.updateUsersConfirmationStatus(userId);
        });
    }
    updateUsersRole(userId, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const isModified = yield this.usersRepository.updateUserRole(new mongodb_1.ObjectId(userId), role);
            if (isModified) {
                return yield this.usersRepository.getUserById(new mongodb_1.ObjectId(userId));
            }
            return null;
        });
    }
    _generateHash(password, salt) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcrypt_1.default.hash(password, salt);
        });
    }
    createUserInputDto({ username, password, email }, isCreatingByAdmin) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordSalt = yield bcrypt_1.default.genSalt(10);
            const passwordHash = yield this._generateHash(password, passwordSalt);
            const code = (0, uuid_1.v4)();
            return {
                _id: new mongodb_1.ObjectId(),
                userProfile: {
                    username, passwordSalt, passwordHash, email, role: 0
                },
                userConfirmation: {
                    isConfirmed: isCreatingByAdmin,
                    confirmationCode: code,
                    codeExpirationDate: (0, add_1.default)(new Date, {
                        minutes: 3
                    })
                }
            };
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(users_repository_1.UsersRepository)),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository])
], UsersService);

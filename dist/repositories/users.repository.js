"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.UsersRepository = void 0;
const inversify_1 = require("inversify");
const db_1 = require("../db");
let UsersRepository = class UsersRepository {
    getUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = {
                'userProfile.username': { $regex: username, $options: 'i' }
            };
            return db_1.UsersModel.findOne(filter);
        });
    }
    getUserByCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = {
                'userConfirmation.confirmationCode': { $regex: code, $options: 'i' }
            };
            return db_1.UsersModel.findOne(filter);
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.UsersModel.findOne({ _id: userId });
            if (user)
                return {
                    username: user.userProfile.username,
                    email: user.userProfile.email,
                    id: user._id.toString(),
                    role: user.userProfile.role
                };
            return null;
        });
    }
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.UsersModel.create(data);
        });
    }
    updateUsersConfirmationStatus(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.UsersModel.updateOne({
                _id: userId
            }, {
                'userConfirmation.isConfirmed': true
            });
            return res.modifiedCount === 1;
        });
    }
    updateUserRole(userId, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield db_1.UsersModel.updateOne({
                _id: userId
            }, {
                'userProfile.role': role
            });
            return data.modifiedCount === 1;
        });
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, inversify_1.injectable)()
], UsersRepository);

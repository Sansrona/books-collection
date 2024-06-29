"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersSchema = exports.BooksSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.BooksSchema = new mongoose_1.default.Schema({
    author: String,
    title: String,
    publicationDate: String,
    genres: [String]
}, { timestamps: true });
exports.UsersSchema = new mongoose_1.default.Schema({
    userProfile: {
        username: String,
        email: String,
        passwordSalt: String,
        passwordHash: String,
        role: { type: Number, default: 0 }
    },
    userConfirmation: {
        isConfirmed: Boolean,
        confirmationCode: String,
        codeExpirationDate: Date,
    },
}, { timestamps: true });

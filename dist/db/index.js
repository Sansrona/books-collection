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
exports.runDb = exports.UsersModel = exports.BooksModel = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const schemas_1 = require("../types/schemas");
dotenv_1.default.config();
const mongoURI = process.env.MONGO_URL || 'mongodb://localhost:27017';
if (!mongoURI)
    throw new Error('NO MONGO URI');
exports.BooksModel = mongoose_1.default.model('books', schemas_1.BooksSchema);
exports.UsersModel = mongoose_1.default.model('users', schemas_1.UsersSchema);
const runDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(mongoURI);
    }
    catch (e) {
        yield mongoose_1.default.disconnect();
    }
});
exports.runDb = runDb;

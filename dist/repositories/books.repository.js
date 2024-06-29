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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksRepository = void 0;
const inversify_1 = require("inversify");
const db_1 = require("../db");
const mongodb_1 = require("mongodb");
let BooksRepository = class BooksRepository {
    getAllBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.BooksModel
                .find()
                .lean();
            if (result) {
                return result.map((post) => {
                    const { _id } = post, body = __rest(post, ["_id"]);
                    return {
                        id: _id.toString(),
                        title: body.title,
                        author: body.author,
                        genres: body.genres,
                        publicationDate: body.publicationDate,
                    };
                });
            }
            return null;
        });
    }
    getBookById(bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield db_1.BooksModel.findOne({ _id: new mongodb_1.ObjectId(bookId) });
            if (book) {
                return {
                    id: book._id,
                    author: book.author,
                    title: book.title,
                    publicationDate: book.publicationDate,
                    genres: book.genres,
                };
            }
            return null;
        });
    }
    createBook(newBook) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.BooksModel.create(newBook);
            return result._id;
        });
    }
    updateBookById(postId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield db_1.BooksModel.updateOne({ _id: new mongodb_1.ObjectId(postId) }, {
                title: body.title, author: body.author, genres: body.genres, publicationDate: body.publicationDate
            });
            return data.modifiedCount === 1;
        });
    }
    deleteBookById(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.BooksModel.deleteOne({ _id: new mongodb_1.ObjectId(postId) });
            return result.deletedCount === 1;
        });
    }
};
exports.BooksRepository = BooksRepository;
exports.BooksRepository = BooksRepository = __decorate([
    (0, inversify_1.injectable)()
], BooksRepository);

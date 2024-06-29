import mongoose from "mongoose";
import {BooksTypes} from "./books.types";
import { WithId} from "mongodb";
import {UserTypes} from "./users.types";

export const BooksSchema = new mongoose.Schema<BooksTypes>({
    author: String,
    title: String,
    publicationDate: String,
    genres: [String]
}, { timestamps: true })

export const UsersSchema = new mongoose.Schema<WithId<UserTypes>>({
    userProfile: {
        username: String,
        email: String,
        passwordSalt: String,
        passwordHash:String,
        role: {type: Number, default: 0}
    },
    userConfirmation: {
        isConfirmed: Boolean,
        confirmationCode: String,
        codeExpirationDate: Date,
    },
}, { timestamps: true })



import dotenv from 'dotenv'
import mongoose from 'mongoose';
import {
    UsersSchema,
    BooksSchema
} from "../types/schemas";
import {BooksTypes} from "../types/books.types";
import {UserTypes} from "../types/users.types";

dotenv.config()
const mongoURI = process.env.MONGO_URL || 'mongodb://localhost:27017'
if(!mongoURI) throw new Error('NO MONGO URI')

export const BooksModel = mongoose.model<BooksTypes>('books', BooksSchema);
export const UsersModel = mongoose.model<UserTypes>('users', UsersSchema);

export const runDb =  async () => {
    try {
        await mongoose.connect(mongoURI);
    } catch(e) {
        await mongoose.disconnect();
    }
}
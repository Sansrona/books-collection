import { injectable } from "inversify";
import {CreateBookInputTypes} from "../types/books.types";
import {BooksModel} from "../db";
import {ObjectId} from "mongodb";

@injectable()
export class BooksRepository {
    async getAllBooks() {
        const result = await BooksModel
            .find()
            .lean()
        if(result){
           return  result.map((post) => {
               const {_id, ...body} = post;
               return {
                    id: _id.toString(),
                    title: body.title,
                   author: body.author,
                   genres: body.genres,
                   publicationDate: body.publicationDate,
               }
           })
        }
        return null;
    }
    async getBookById(bookId: string) {
        const book = await BooksModel.findOne({_id: new ObjectId(bookId)});
        if(book){

        return {
            id: book._id,
            author: book.author,
            title: book.title,
            publicationDate: book.publicationDate,
            genres:book.genres,
        }
        }
        return null
    }
    async createBook(newBook: CreateBookInputTypes){
            const result =  await BooksModel.create(newBook);
            return result._id;
    }
    async updateBookById(postId: string, body: CreateBookInputTypes): Promise<boolean> {
        const data = await BooksModel.updateOne({_id:  new ObjectId(postId)}, {
            title: body.title, author: body.author, genres: body.genres, publicationDate: body.publicationDate})
        return data.modifiedCount === 1;
    }
    async deleteBookById(postId: string){
        const result = await BooksModel.deleteOne({_id:  new ObjectId(postId)});
        return result.deletedCount === 1;
    }
}
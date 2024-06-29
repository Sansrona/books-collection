import {WithId} from "mongodb";

export type BooksTypes = WithId<{
    title: string,
    author: string,
    publicationDate: Date,
    genres: string[]
}>
export type CreateBookInputTypes = {
    title: string,
    author: string,
    publicationDate: Date,
    genres: string[]
}

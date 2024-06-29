import {Request} from "express";

export const createBookBody = (req: Request) => ({
    author: req.body.author,
    title: req.body.title,
    genres: req.body.genres,
    publicationDate: req.body.publicationDate
})
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookBody = void 0;
const createBookBody = (req) => ({
    author: req.body.author,
    title: req.body.title,
    genres: req.body.genres,
    publicationDate: req.body.publicationDate
});
exports.createBookBody = createBookBody;

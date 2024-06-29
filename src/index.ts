import express from 'express';
import cookieParser from 'cookie-parser'
import {booksRouter} from "./routes/books.route";
import {runDb} from "./db";
import {authRouter} from "./routes/auth.route";
export const app = express();
const port = process.env.PORT || 3000;

export const ValidPaths = {
    books: '/books',
    users: '/users',

}
app.use(express.json());
app.use(express.urlencoded())
app.use(cookieParser())

app.set('trust proxy', true)

app.use(ValidPaths.books, booksRouter);
app.use(ValidPaths.users, authRouter);


app.get('/', (req, res) => {
    res.send('hello world');
})

const startApp = async () => {
    await runDb();
    if (process.env.NODE_ENV !== 'test') {
        app.listen(port, () => console.log(`Listening on port ${port}`))
    }
}
startApp();
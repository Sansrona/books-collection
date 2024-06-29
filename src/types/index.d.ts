import {UserTypes} from "./users.types";

declare global {
    namespace Express {
        export interface Request {
            user: {
                id: string,
                username: string,
                email: string,
            } | null
        }
    }
}
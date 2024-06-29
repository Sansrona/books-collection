import { injectable } from "inversify";
import jwt from 'jsonwebtoken';
import {ObjectId} from "mongodb";


const secret = process.env.PRIVATE_KEY || '123';
const refreshSecret = process.env.JWT_REFRESH_KEY || 'refresh';

@injectable()
export class JwtService {
    constructor() {
    }
    async createAccessJWTToken(userId: ObjectId){
        return jwt.sign({userId: userId}, secret, {expiresIn: '7m'})
    }
    async decodeJWTToken(token:string){
        try {
            const result: any = jwt.verify(token, secret);
            return new ObjectId(result.userId)
        } catch (e){
        return null;
        }
    }
}
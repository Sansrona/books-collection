import { injectable, inject } from "inversify";
import {SimpleCreateUserInputTypes} from "../types/users.types";
import {UsersRepository} from "../repositories/users.repository";
import bcrypt from 'bcrypt';
import {ObjectId} from "mongodb";
import { v4 as uuidv4 } from 'uuid';
import add from 'date-fns/add';

@injectable()
export class UsersService {
    constructor(
        @inject(UsersRepository) protected usersRepository:UsersRepository ) {
    }
    async createUser(data: SimpleCreateUserInputTypes, isCreatingByAdmin: boolean){
        const newUserBody = await this.createUserInputDto(data, isCreatingByAdmin)
        const newUser = await this.usersRepository.createUser(newUserBody);
        return  {
            userProfile: {
                username: newUser.userProfile.username,
                email: newUserBody.userProfile.email,
                id: newUser._id.toString(),
            },
            userConfirmation: newUser.userConfirmation
        } ;
    }

    async checkCredentials(username: string, password:string){
        const user = await this.usersRepository.getUserByUsername(username);
        if(!user) return null;
        const passwordHash = await this._generateHash(password, user.userProfile.passwordSalt);
        return user.userProfile.passwordHash === passwordHash ? user : null;
    }
    async getUserByCode(code: string){
       return await this.usersRepository.getUserByCode(code);
    }
    async updateUsersConfirmationStatus(userId: ObjectId){
        return await this.usersRepository.updateUsersConfirmationStatus(userId)
    }
    async updateUsersRole(userId: string, role: number){
        const isModified = await this.usersRepository.updateUserRole(new ObjectId(userId), role);
        if(isModified){
            return await this.usersRepository.getUserById(new ObjectId(userId));
        }
        return null
    }
    private async _generateHash(password: string, salt: string){
        return bcrypt.hash(password, salt);
    }
    private async createUserInputDto({username, password, email}: SimpleCreateUserInputTypes, isCreatingByAdmin: boolean){
        const passwordSalt = await bcrypt.genSalt(10);
        const passwordHash = await this._generateHash(password, passwordSalt);
        const code = uuidv4();
        return {
            _id: new ObjectId(),
            userProfile: {
                username, passwordSalt, passwordHash,  email, role: 0
            },
            userConfirmation: {
                isConfirmed: isCreatingByAdmin,
                confirmationCode: code,
                codeExpirationDate: add(new Date, {
                    minutes: 3
                })
            }
        }
    }
}
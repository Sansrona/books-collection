import { injectable, inject } from "inversify";
import {SimpleCreateUserInputTypes} from "../types/users.types";
import {UsersService} from "./users.service";
import {emailsManager} from "../managers/email-confirmation";

@injectable()
export class AuthService {
    constructor(
        @inject(UsersService) protected usersService: UsersService) {
    }
    async registerUser(body: SimpleCreateUserInputTypes){
        const newUser = await this.usersService.createUser(body, false);
        try {
            emailsManager.sendConfirmationCodeEmail(body.email, newUser.userConfirmation.confirmationCode, 'Confirmation code' )
        }catch (e){
            console.log('error during user registration');
            throw new Error('error during user registration')
        }
        return newUser.userProfile;
    }
    async verifyConfirmationCode(code:string){
        const user = await this.usersService.getUserByCode(code);
        if(user){
            if(user.userConfirmation.codeExpirationDate < new Date() || user.userConfirmation.isConfirmed){
                return null;
            }
            return await this.usersService.updateUsersConfirmationStatus(user._id);
           }
        return null;
    }
    }
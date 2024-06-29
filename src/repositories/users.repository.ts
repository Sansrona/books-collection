import { injectable } from "inversify";
import { UserTypes} from "../types/users.types";
import {UsersModel} from "../db";
import {ObjectId} from "mongodb";

@injectable()
export class UsersRepository {

    async getUserByUsername(username: string){
        const filter = {
            'userProfile.username': {$regex: username, $options: 'i'}
        }
        return UsersModel.findOne(filter)
    }
    async getUserByCode(code: string){
        const filter = {
                'userConfirmation.confirmationCode': {$regex: code, $options: 'i'}}
        return UsersModel.findOne(filter)
    }
    async getUserById(userId: ObjectId){
        const user =  await UsersModel.findOne({_id: userId});
        if(user) return {
            username: user.userProfile.username,
            email: user.userProfile.email,
            id: user._id.toString(),
            role: user.userProfile.role
        }
        return null;
    }
    async createUser(data: UserTypes){
       return UsersModel.create(data);
       }
    async updateUsersConfirmationStatus(userId: ObjectId){
        const res = await UsersModel.updateOne({
            _id: userId
        }, {
             'userConfirmation.isConfirmed': true
        })
        return res.modifiedCount === 1;
    }
    async updateUserRole(userId: ObjectId, role: number){
        const data = await UsersModel.updateOne({
            _id: userId
        }, {
            'userProfile.role': role
        })
        return data.modifiedCount === 1;
    }
}
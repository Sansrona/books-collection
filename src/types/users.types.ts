import {WithId} from "mongodb";

export type UserTypes = WithId<{
    userProfile: UserProfileTypes,
    userConfirmation: UserConfirmationTypes,
}>

export type UserProfileTypes = {
    username: string,
    email: string,
    passwordSalt: string;
    passwordHash:string;
    role: number
}

export type UserConfirmationTypes = {
    isConfirmed: boolean;
    confirmationCode: string,
    codeExpirationDate: Date,
}

export type SimpleCreateUserInputTypes = {
    username: string;
    password: string;
    email: string;
}




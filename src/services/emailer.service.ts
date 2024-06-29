import {emailsManager} from "../managers/email-confirmation";

export const emailService = {
    sendEmail(userEmail: string, message: string, subject: string){
        emailsManager.sendConfirmationCodeEmail(userEmail,message, subject);
    }
}
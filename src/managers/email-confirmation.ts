import {sendEmail} from "../adapters/email-adapter";

export const emailsManager = {
    sendConfirmationCodeEmail(userEmail: string, message:string, subject: string){
        const messageTemplate = `
            <h1>Thanks for your registration</h1>
            <p>To finish registration please follow the link below:
                <a href='https://it-incubator-theta.vercel.app/confirm-email?code=${message}'>complete registration</a>
            </p>`;
        const options = {
            from: 'Johnny <johnny178917@gmail.com>',
            to: userEmail,
            subject: subject,
            html: messageTemplate,
        }
        sendEmail(options, () => {
            console.log('Email is delivered successfully');
            return true;
        })
    },
 }
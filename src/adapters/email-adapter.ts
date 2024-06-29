import nodemailer from 'nodemailer';
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import dotenv from "dotenv";
dotenv.config()

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'johnny178917@gmail.com',
        pass: process.env.GOOGLE_PASSWORD
    }
})

export const sendEmail = async (mailDerails: Mail.Options, callback: (info: SMTPTransport.SentMessageInfo)=>void) => {
    try {
        const info = await transport.sendMail(mailDerails);
        callback(info)
    } catch (e) {
        console.log(e);
        throw Error('Error during email sending');
    }
}
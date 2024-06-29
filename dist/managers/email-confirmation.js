"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailsManager = void 0;
const email_adapter_1 = require("../adapters/email-adapter");
exports.emailsManager = {
    sendConfirmationCodeEmail(userEmail, message, subject) {
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
        };
        (0, email_adapter_1.sendEmail)(options, () => {
            console.log('Email is delivered successfully');
            return true;
        });
    },
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = void 0;
const email_confirmation_1 = require("../managers/email-confirmation");
exports.emailService = {
    sendEmail(userEmail, message, subject) {
        email_confirmation_1.emailsManager.sendConfirmationCodeEmail(userEmail, message, subject);
    }
};

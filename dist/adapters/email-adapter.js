"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transport = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'johnny178917@gmail.com',
        pass: process.env.GOOGLE_PASSWORD
    }
});
const sendEmail = (mailDerails, callback) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const info = yield transport.sendMail(mailDerails);
        callback(info);
    }
    catch (e) {
        console.log(e);
        throw Error('Error during email sending');
    }
});
exports.sendEmail = sendEmail;

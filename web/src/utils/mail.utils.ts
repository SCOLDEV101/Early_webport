import { MAIL_PASSWORD, MAIL_USER } from '@/app/constants/staticData'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, //true
    auth: {
        user: process.env.MAIL_USER || MAIL_USER || "",
        pass: process.env.MAIL_PASSWORD || MAIL_PASSWORD || "",
    },
} as SMTPTransport.Options)

type SendEmailDto = {
    sender: Mail.Address;
    receipients: Mail.Address[];
    subject: string;
    message: string;
    attachments?: Array<{ filename: string; path: string }>;
}
export const sendEmail = async (dto: SendEmailDto) => {
    const { sender, receipients, subject, message, attachments } = dto;

    return await transport.sendMail({
        from: sender,
        to: receipients,
        subject,
        html: message,
        text: message,
        attachments,
    })
}   
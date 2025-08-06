import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
@Injectable()
export class MailService {
    constructor() {
        const apiKey = process.env.SENDGRID_API_KEY;
        if (!apiKey) {
            throw new Error('SENDGRID_API_KEY environment variable is not set');
        }
        sgMail.setApiKey(apiKey);
    }

    async sendMail(to: string, subject: string, text: string, html?: string) {
        const fromEmail = process.env.FROM_EMAIL;
        if (!fromEmail) {
            throw new Error('FROM_EMAIL environment variable is not set');
        }
        const msg = {
            to,
            from: fromEmail,
            subject,
            text,
            html: html || text,
        };

        try {
            await sgMail.send(msg);
            console.log('Email sent');
        } catch (error) {
            console.error('SendGrid Error:', error);
            if (error.response) {
                console.error(error.response.body);
            }
        }
    }
}
//   async sendMultipleMails(recipients: { to: string; subject: string; text: string; html?: string }[]) {

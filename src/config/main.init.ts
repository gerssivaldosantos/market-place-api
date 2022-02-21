import { createTransport } from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config();

const transport = createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
})

export default transport;
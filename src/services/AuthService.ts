import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { User } from '../entities/UserEntity';
import bcrypt from 'bcryptjs'
import transport from '../config/main.init';
class AuthService {
    async rescuePassword(email: string) {
        try {
            const repository = getRepository(User);
            const user = await repository.findOne({ email });
            if (!user) {
                return {
                    status: 404,
                    message: 'User not found',
                    content: null
                };
            }
            const emailToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            user.email_token = emailToken;
            await transport.sendMail({
                from: process.env.MAIL_USER,
                to: user.email,
                subject: "Please confirm your account",
                html: `<h1>Email Confirmation</h1>
                    <h2>Hello User</h2>
                    <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
                    <a href=${process.env.CLIENT + '/login/change-password/' + emailToken}> Click here</a>
                    </div>`,
              }).catch((err:any) => console.log(err));}
        catch (err) {
            return {
                status: 500,
                message: 'Internal Server Error',
                content: err.driverError ?? err
            };
        }
    }
    async changePassword(emailToken: string, password: string) {

        try {
            const repository = getRepository(User);
            const user = await repository.findOne({ email_token: emailToken });
            if (!user) {
                return {
                    status: 404,
                    message: 'Token Not Found',
                    content: null
                };
            }
            user.password = await bcrypt.hash(password, 8);
            await repository.save(user);
        }
        catch (err) {
            return {
                status: 500,
                message: 'Internal Server Error',
                content: err.driverError ?? err
            };
        }
    }
}


export default new AuthService();
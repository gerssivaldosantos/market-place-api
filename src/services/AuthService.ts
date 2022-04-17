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
                subject: "Recover Password",
                html: `<h1>Reset your password</h1>
                    <h2>Hello User</h2>
                    <p>The password can be changed in page following the link below</p>
                    <a href=${process.env.CLIENT + '/login/change-password/' + emailToken}> Click here</a>
                    </div>`,
              }).catch((err:any) => console.log(err));
            return {
                status: 200,
                message: 'Email sent',
                content: null
            }
            }
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
            return {
                status: 200,
                message: 'Password Changed',
                content: null
            };
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
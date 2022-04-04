import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { getRepository } from 'typeorm';
import { User } from '../entities/UserEntity';
import transport from '../config/main.init';

class ValidateMiddleware {

    async validateEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const repository = getRepository(User);
            const user = await repository.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const { is_validated } = user;
            
            if (!is_validated) {
                user.email_token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                await repository.save(user);
                await transport.sendMail({
                    from: process.env.MAIL_USER,
                    to: user.email,
                    subject: "Please confirm your account",
                    html: `<h1>Email Confirmation</h1>
                        <h2>Hello User</h2>
                        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
                        <a href=${process.env.BASE_URL + "/validate_email/" + user.email_token}> Click here</a>
                        </div>`,
                  }).catch(err => console.log(err));
                

                return res.status(400).json({
                    error: "this email is not has validated, we will send confirmation link to your email",
                })
            }

            return next();
        }

        catch (err) {
            return res.status(500).json({
                error: err
            })
        }
    }
}

export default new ValidateMiddleware();
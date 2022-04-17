import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken'
import { User } from '../entities/UserEntity';
import UserService from '../services/UserService';
import AuthService from '../services/AuthService';

function formatToken(token: string): string {
    return token.replace('Bearer', '').trim();
}

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}
class AuthController {
    async authenticate(req: Request, res: Response) {

        const repository = getRepository(User);

        const { email } = req.body;

        const user = await repository.findOne({ email });

        const secret = process.env.JWT_SECRET_KEY || '';

        const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1d' })

        return res.status(200).json({
            id: user.id,
            token: token
        });
    }

    async getUserByToken(req: Request, res: Response) {
        try {
            const id = req.userId;
            const user = await UserService.getById(id);
            if (!user){
                return res.status(404).json({
                    message:"User not found"
                })
            }
            return res.status(200).json({
                user
            });
        }

        catch (err) {
            return res.status(500).json({
                message: "Has error in token validation",
            })
        }
    }

    async activate(req: Request, res: Response) {

        try {
            const { email_token } = req.params;

            const repository = getRepository(User);

            const user = await repository.findOne({
                where: {
                    email_token: email_token
                }
            })

            if (!user) {
                return res.status(404).json({ message: 'Token not found' });
            }

            user.is_validated = true;
            await repository.save(user);

            return res.status(200).redirect(process.env.CLIENT + '/login/congratulations');
        }
        catch (err) {
            return res.status(500).json({
                error: err
            })
        }


    }

    async rescuePassword(req: Request, res: Response){
        const email = req.body.email;
        await AuthService.rescuePassword(email);
        return res.status(200).json({
            message: "We have sent you an email to reset your password"
        })
    }

    async changePassword(req: Request, res: Response){
        const { token, password } = req.body;
        await AuthService.changePassword(token, password);
        return res.status(200).json({
            message: "Your password has been changed"
        })
    }
}


export default new AuthController()
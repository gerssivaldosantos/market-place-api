import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken'
import { User } from '../entities/UserEntity';

class AuthController {
    async authenticate(req: Request, res: Response) {

        const repository = getRepository(User);

        const { email } = req.body;

        const user =  await repository.findOne({email});

        const secret = process.env.JWT_SECRET_KEY || '';

        const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1d' })

        return res.json({
            user,
            token
        });
    }

    async activate(req: Request, res: Response) {

        try{
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
    
            return res.status(200).json({ message: 'User activated' });
        }
        catch(err){
            return res.status(500).json({
                error: err
            })
        }
       

    }
}


export default new AuthController()
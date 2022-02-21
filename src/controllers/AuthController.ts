import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { User } from '../entities/UserEntity';

class AuthController {
    async authenticate(req: Request, res: Response) {
        const userRepo = getRepository(User);
        const { email, password } = req.body;
        const user = await userRepo.
            createQueryBuilder('user').
            select().
            addSelect("user.password").
            where("user.email = :email", { email }).
            getOne();


        if (!user) {
            {
                return res.status(401).json({ message: 'User not found' });
            }

        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }

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
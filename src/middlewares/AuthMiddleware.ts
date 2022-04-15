import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { User } from '../entities/UserEntity';
import bcrypt from 'bcryptjs';
interface TokenPayload{
    id: string;
    iat: number;
    exp: number;
}

function formatToken(token: string): string{
    return token.replace('Bearer', '').trim();
}

class AuthMiddleware{
    
    async checkCredentials(req: Request, res: Response, next: NextFunction){
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

        return next();
    }

    checkToken(req: Request, res: Response, next: NextFunction){

        const { authorization } = req.headers;

        try{
            if(!authorization){
                return res.status(401).json({
                    error: 'Token not provided'
                })
            }
            const token = formatToken(authorization);
            const secret = process.env.JWT_SECRET_KEY?? "";
            const data = jwt.verify(token,secret);
            const {id, iat, exp} = data as TokenPayload;
            req.userId = id;
            req.iat = iat;
            req.exp = exp;
            return next();
        }
       
        catch(err){
            return res.status(500).json({
                message: "Has error in token validation",
            })
        }
    }

}

export default new AuthMiddleware();
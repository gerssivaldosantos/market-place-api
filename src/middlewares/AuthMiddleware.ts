import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload{
    id: string;
    iat: number;
    exp: number;
}

function formatToken(token: string): string{
    return token.replace('Bearer', '').trim();
}

class AuthMiddleware{
    
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
            return res.status(401).json({
                message: "Unathourized"
            })
        }
    }

}

export default new AuthMiddleware();
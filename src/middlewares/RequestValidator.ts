import { validate } from 'class-validator';
import { UserRequest } from '../@types/userRequest';
import { Request, Response, NextFunction} from 'express';

class RequestValidator {

    async user(req: Request, res: Response, next: NextFunction) {
        const user = req.body as UserRequest;
        const errors = await validate(user);
        if (errors.length > 0) {
            return {
                status: 400,
                message: 'Bad Request',
                content: errors
            };

        }
        next();
    }
}
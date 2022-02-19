import { validate } from 'class-validator';
import { UserRequest } from '../@types/UserRequest';
import { Request, Response, NextFunction} from 'express';

class RequestValidator {

    async user(req: Request, res: Response, next: NextFunction) {
        const user = req.body as UserRequest;
        const user_request = new UserRequest(user);
        const errors = await validate(user_request);

        if (errors.length > 0) {
            return res.status(400).json({
                message: 'Bad Request',
                content: errors[0].constraints ?? null
            });

        }
        next();
    }
}


export default new RequestValidator();
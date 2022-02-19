import { validate } from 'class-validator';
import { UserRequest } from '../@types/UserRequest';
import { Request, Response, NextFunction} from 'express';

class RequestValidator {

    async user(req: Request, res: Response, next: NextFunction) {
        const user = req.body as UserRequest;
        const user_request = new UserRequest();
        user_request.name = user.name;
        user_request.email = user.email;
        user_request.password = user.password;
        user_request.user_type_id = user.user_type_id;
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
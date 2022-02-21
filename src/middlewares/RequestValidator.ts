import { validate } from 'class-validator';
import { UserRequest } from '../@types/UserRequest';
import { Request, Response, NextFunction} from 'express';

class RequestValidator {

    async user(req: Request, res: Response, next: NextFunction) {
        const {name, email, password, user_type_id} = req.body as UserRequest;
        const user_request = new UserRequest();
        user_request.name = name;
        user_request.email = email;
        user_request.password = password;
        user_request.user_type_id = user_type_id;
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
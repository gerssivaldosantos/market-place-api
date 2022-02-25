import { validate } from 'class-validator';
import { UserRequest } from '../@types/UserRequest';
import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/UserEntity';

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

    async isSelfRequest(req: Request, res: Response, next: NextFunction) {
        const userId = req.userId;
        const id = req.params.id;
        if (userId != id) {
            return res.status(401).json({
                message: "You do not have permission to modify this user"
            })
        }
        next();
    }

    async isAdmin(req: Request, res: Response, next: NextFunction) {
        const repository = getRepository(User);
        const { email } = req.body as UserRequest;
        const user = await repository.findOne({
            where: { email: email },
            relations: ['user_type']
        })

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        if (user.user_type.permission_level !== 0) {
            return res.status(403).json({
                message: 'Forbidden'
            })
        }

        next();

    }
}


export default new RequestValidator();
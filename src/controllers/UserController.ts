import { Response, Request } from 'express';
import { UserRequest } from '../@types/UserRequest';
import UserService from '../services/UserService';

class UserController {
    async create(req: Request, res: Response) {
        const user: UserRequest = req.body;
        const result = await UserService.create(user);
        res.status(result.status).json(result)
    }

    async getAll(req: Request, res: Response) {
        const result = await UserService.getAll();
        return res.status(result.status).json(result)
    }

    async getById(req: Request, res: Response) {
        const id = req.params.id;
        const result = await UserService.getById(id);
        return res.status(result.status).json(result)

    }

    async update(req: Request, res: Response) {
        const id = req.params.id;
        const user: UserRequest = req.body;
        const result = await UserService.update(id, user);
        return res.status(result.status).json(result)
    }

    async delete(req: Request, res: Response) {
        const id = req.params.id;
        const result = await UserService.delete(id);
        return res.status(result.status).json(result)
    }
}

export default new UserController();
import { Request, Response } from 'express';
import UserTypeService from '../services/UserTypeService';

class UserTypeController {
    async create(req: Request, res: Response) {
        const { name, description, permission_level } = req.body;
        const result = await UserTypeService.create(name, description, permission_level);
        return res.status(result.status).json(result);
    }


    async getAll(req: Request, res: Response) {
        const result = await UserTypeService.getAll();
        return res.status(result.status).json(result);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, description, permission_level } = req.body;
        const result = await UserTypeService.update(id, name, description, permission_level);
        return res.status(result.status).json(result);
    }
}


export default new UserTypeController();
import { Request, Response } from 'express';
import UserTypeService from '../services/UserTypeService';

class UserTypeController {
    async create(req: Request, res: Response) {
        const { name, description, permission_level } = req.body;
        const result = await UserTypeService.create(name, description, permission_level);
        return res.status(result.status).json(result);
    }
}


export default new UserTypeController();
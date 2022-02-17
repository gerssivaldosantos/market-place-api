import {Response, Request} from 'express';
import UserService from '../services/UserService';

class UserController{
    async getAll(req: Request, res: Response){
        const users = await UserService.getAll();
        if (!users){
            return res.status(500).json({
                message: "Internal Server Error"
            });
        }
        return res.status(200).json(users);
    }
}

export default new UserController();
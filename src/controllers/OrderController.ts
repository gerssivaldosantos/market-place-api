import { Request, Response } from 'express';
import OrderService from '../services/OrderService';

class OrderController {

    async getAll(req: Request, res: Response) {
        const result = await OrderService.getAll();
        return res.status(result.status).json(result)
    }
}

export default new OrderController();
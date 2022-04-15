import { Request, Response } from 'express';
import OrderService from '../services/OrderService';

class OrderController {

    async create(req: Request, res: Response) {
        const {product_id, customer_id, seller_id, quantity} = req.body;
        const result = await OrderService.create({product_id, customer_id, seller_id, quantity});
        return res.status(result.status).json(result)
    }

    async getAll(req: Request, res: Response) {
        const result = await OrderService.getAll();
        return res.status(result.status).json(result)
    }

    async getById(req: Request, res: Response) {
        const {id} = req.params;
        const result = await OrderService.getById(id);
        return res.status(result.status).json(result)
    }
}

export default new OrderController();
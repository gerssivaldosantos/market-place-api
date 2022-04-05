import { Request, Response } from 'express';
import { ProductRequest } from '../@types/ProductRequest';
import ProductService from '../services/ProductService';


class ProductController {
    async getAll(req: Request, res: Response) {
        const result = await ProductService.getAll();
        return res.status(result.status).json(result)
    }

    async create(req: Request, res: Response) {
        const product: ProductRequest = req.body;
        const result = await ProductService.create(product);
        return res.status(result.status).json(result)
    }
}

export default new ProductController();
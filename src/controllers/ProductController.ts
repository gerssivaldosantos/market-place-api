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

    async getById(req: Request, res: Response) {
        const {id} = req.params;
        const result = await ProductService.getById(id);
        return res.status(result.status).json(result)
    }

    async deleteBulk(req: Request, res: Response) {
        const { ids } = req.body 
        const result = await ProductService.bulkDelete(ids)
        return res.status(result.status).json(result)
    }

    async getShoppingCart(req: Request, res: Response) {
        const { userId } = req.body;
        const result = await ProductService.getShoppingCart(userId);
        return res.status(result.status).json(result)
    }
}

export default new ProductController();
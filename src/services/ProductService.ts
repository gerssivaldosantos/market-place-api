import { getRepository } from "typeorm";
import { ProductRequest } from "../@types/ProductRequest";
import { Product } from "../entities/ProductEntity";
import {v4 as uuid} from 'uuid'

class ProductService {
    async getAll() {
        try {
            const repository = getRepository(Product);
            const products = await repository.find();
            return {
                status: 200,
                content: products,
                message: 'Products retrieved successfully',
            };
        }
        catch (err) {
            return {
                status: 500,
                message: err,
                content: null
            };

        }
    }

    async create(product: ProductRequest) {
        try {
            const repository = getRepository(Product);
            const { name, description, price } = product;
            const id = uuid()
            const newProduct = await repository.save(
                {
                    id,
                    name,
                    description,
                    price
                }
            );
            return {
                status: 201,
                content: newProduct,
                message: 'Product created successfully',
            };
        }
        catch (err) {
            return {
                status: 500,
                message: err,
                content: null
            };

        }
    }
}

export default new ProductService();
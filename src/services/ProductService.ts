import { getConnection, getRepository } from "typeorm";
import { ProductRequest } from "../@types/ProductRequest";
import { Product } from "../entities/ProductEntity";
import { v4 as uuid } from 'uuid'
import { ShoppingCart } from "../entities/ShoppingCartEntity";

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
            const { name, description, price, owner_id } = product;
            const id = uuid()
            const newProduct = await repository.save(
                {
                    id,
                    name,
                    description,
                    price,
                    owner_id
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

    async getById(id: string) {
        try {
            const repository = getRepository(Product);
            const product = await repository.findOne(
                {
                    where: { id: id },
                }
            );
            if (!product) {
                return {
                    status: 404,
                    content: null,
                    message: 'Product not found',
                };
            }
            return {
                status: 200,
                content: product,
                message: 'Product retrieved successfully',
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

    async bulkDelete(ids: Record<string,string[]>) {
        const productRepository = getRepository(Product)
        const productIds = Object.values(ids)
        const products = await productRepository.findByIds(productIds)
        try {
            await productRepository.remove(products)
            return {
                status: 200,
                content: null,
                message: 'Products deleted successfully',
            }
        }
        catch (err) {
            return {
                status: 500,
                message: err,
                content: null
            };
        }
    }

    async getShoppingCart(userId: string) {
        const shoppingCartRepository = getRepository(ShoppingCart)
        const shoppingCart = await shoppingCartRepository.find({
            where: { user_id: userId },
            relations: ['product']
        })
        const products = shoppingCart.map((item:any) => item.product)
        return {
            status: 200,
            content: products,
            message: 'Products retrieved successfully',
        }
    }

}

export default new ProductService();
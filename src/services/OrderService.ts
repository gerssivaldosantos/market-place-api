import { getRepository } from "typeorm";
import { Order } from "../entities/OrderEntity";
import {v4 as uuid} from 'uuid';

class OrderService {

    async create({ product_id, customer_id, seller_id, quantity }) {
        const id = uuid();
        const repository = getRepository(Order)
        const order = repository.create({
            id,
            product_id,
            customer_id,
            seller_id,
            quantity
        })
        try {
            await repository.save(order);
            return { status: 200, data: order }
        }
        catch(err){
            return { status: 500, message: err, data: {} }
        }
        
        
    }

    async getAll() {
        const repository = getRepository(Order)
        const orders = await repository.find(
            {
                relations: ["customer","seller", "product"]
            }
        )
        return { status: 200, data: orders }
    }

    async getById(id: string) {
        const repository = getRepository(Order)
        const order = await repository.findOne(
            {
                where: {id: id},
                relations: ["customer","seller", "product"]
            }
        )
        if (!order) {
            return { status: 404, data: {} }
        }
        return { status: 200, data: order }

    }
}

export default new OrderService();
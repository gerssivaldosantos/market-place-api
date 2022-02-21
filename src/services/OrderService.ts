import { getRepository } from "typeorm";
import { Order } from "../entities/OrderEntity";

class OrderService {

    async create({ product_id, customer_id, seller_id, quantity }) {
        const repository = getRepository(Order)
        const order = repository.create({
            product_id,
            customer_id,
            seller_id,
            quantity
        })
        await repository.save(order);
        return { status: 200, data: order }
    }

    async getAll() {
        const repository = getRepository(Order)
        const orders = await repository.find()
        return { status: 200, data: orders }
    }
}

export default new OrderService();
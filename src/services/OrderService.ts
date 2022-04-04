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
        const orders = await repository.find()
        return { status: 200, data: orders }
    }
}

export default new OrderService();
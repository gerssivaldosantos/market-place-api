import { getRepository } from "typeorm";
import { Order } from "../entities/OrderEntity";

class OrderService{

    async getAll(){
        const repository = getRepository(Order)
        const orders = await repository.find()
        return {status: 200, data: orders}
    }
}

export default new OrderService();
import { getRepository } from "typeorm";
import { User } from "../entities/UserEntity";

class UserService {
    async getAll() {
        try{
            const repository = await getRepository(User)
            const users = repository.find();
            if (!users) {
                return undefined;
            }
            return users;
        }
        catch{
            return undefined;
        }
    }
}

export default new UserService();
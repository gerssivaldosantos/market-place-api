import { getRepository, Repository } from "typeorm";
import { UserRequest } from "../@types/userRequest";
import { User } from "../entities/UserEntity";

class UserService {

    async create(user_request: UserRequest) {
        try {
            const repository = getRepository(User);
            const { name, user_type_id, email, password } = user_request;
            const user = repository.create({
                name,
                user_type_id,
                email,
                password
            });
            await repository.save(user);
            return {
                status: 201,
                message: "User created successfully",
                data: user
            };
        } catch (err) {
            return {
                status: 500,
                message: "Internal Server Error",
                data: err
            };
        }
    }

    async getAll() {
        try {
            const repository = await getRepository(User)
            const users = repository.find();
            if (!users) {
                return {
                    status:404,
                    message: "Users not found",
                    content: null
                };
            }
            return {
                status: 200,
                message: "Users found",
                content: users
            };
        }
        catch {
            return {
                status: 500,
                message: "Internal Server Error",
                content: null
            };
        }
    }
}

export default new UserService();
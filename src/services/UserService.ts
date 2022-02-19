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
                data: err.driverError ?? err
            };
        }
    }

    async getAll() {
        try {
            const repository = getRepository(User);
            const users = await repository.find();
            return {
                status: 200,
                content: users,
                message: 'Users retrieved successfully',
            };
        }
        catch {
            return {
                status: 500,
                message: 'Internal Server Error',
                content: null
            };

        }
    }
}

export default new UserService();
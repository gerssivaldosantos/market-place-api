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

    async getById(id: string) {
        try {
            const repository = getRepository(User);
            const user = await repository.findOne(id);
            if (!user) {
                return {
                    status: 404,
                    message: 'User not found',
                    content: null
                };
            }
            return {
                status: 200,
                content: user,
                message: 'User retrieved successfully',
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

    async update(id: string, user_request: UserRequest) {
        try {
            const repository = getRepository(User);
            const { name, user_type_id, email, password } = user_request;
            const user = await repository.findOne(id);
            if (!user) {
                return {
                    status: 404,
                    message: 'User not found',
                    content: null
                };
            }
            user.email = email;
            user.name = name;
            user.user_type_id = user_type_id;
            user.password = password;
            await repository.save(user);
            return {
                status: 200,
                message: 'User updated successfully',
                content: user
            }
        }
        catch (err) {
            return {
                status: 500,
                message: 'Internal Server Error',
                content: err.driverError ?? err
            };

        }
    }

    async delete(id: string) {
        try {
            const repository = getRepository(User);
            const user = await repository.findOne(id);
            if (!user) {
                return {
                    status: 404,
                    message: 'User not found',
                    content: null
                };
            }
            await repository.delete(id);
            return {
                status: 200,
                message: 'User deleted successfully',
                content: null
            };
        }
        catch (err) {
            return {
                status: 500,
                message: 'Internal Server Error',
                content: err.driverError ?? err
            };

        }
    }
}

export default new UserService();
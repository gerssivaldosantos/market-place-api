import { getRepository, Repository } from "typeorm";
import { UserRequest } from "../@types/UserRequest";
import { User } from "../entities/UserEntity";
import bcrypt from 'bcryptjs'
import {v4 as uuid} from 'uuid';
class UserService {

    async create(user_request: UserRequest) {
        try {
            const repository = getRepository(User);
            let { name, user_type_id, email, password } = user_request;
            password = await bcrypt.hash(password, 8);
            const id = uuid();
            const user = repository.create({
                id,
                name,
                user_type_id,
                email,
                password
            });
            await repository.save(user);
            delete user.password;
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
            if (email) user.email = email;
            if (name) user.name = name;
            if (user_type_id) user.user_type_id = user_type_id;
            if (password) user.password = password;
            
            await repository.save(user);
            delete user.password;
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
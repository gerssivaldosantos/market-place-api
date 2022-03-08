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
            const email_token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            const is_validated = false;
            password = await bcrypt.hash(password, 8);
            const id = uuid();
            const user = repository.create({
                id,
                name,
                user_type_id,
                email,
                password,
                email_token,
                is_validated
            });
            await repository.save(user);
            delete user.password;
            return {
                status: 204,
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
            const users = await repository.find(
                {
                    relations: ["user_type"]
                }
            );
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
            const user = await repository.find(
                {   
                    where: {id: id},
                    relations: ["user_type"]
                }
            );
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
            if (password) {
                user.password = await bcrypt.hash(password, 8);
            }
            await repository.save(user);
            return {
                status: 204,
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
                status: 204,
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
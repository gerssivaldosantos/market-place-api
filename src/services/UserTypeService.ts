import { getRepository } from "typeorm";
import UserType from "../entities/UserTypeEntity";

class UserTypeService {
    async create(name: string, description: string, permission_level: number) {
        try {
            const repository = getRepository(UserType);
            const exists = await repository.findOne({ name });
            if (exists) {
                return {
                    status: 401,
                    message: "User type already exists",
                    content: null
                };
            }
            const user_type = repository.create({
                name,
                description,
                permission_level,
            })
            await repository.save(user_type);
            return {
                status: 201,
                content: user_type,
                message: `User Type ${name} created successfully`,
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

    async getAll() {
        try {
            const repository = getRepository(UserType);
            const user_types = await repository.find();
            return {
                status: 200,
                content: user_types,
                message: 'User Types retrieved successfully',
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

    async update(id: string, name: string, description: string, permission_level: number) {
        try {
            const repository = getRepository(UserType);
            const user_type = await repository.findOne(id);

            if (!user_type) {
                return {
                    status: 404,
                    message: 'User type not found',
                    content: null
                }
            }
            if (name) {
                user_type.name = name;
            }
            if (description) {
                user_type.description = description;
            }

            if (permission_level) {
                user_type.permission_level = permission_level;
            }

        }
        catch (err) {
            return {
                status: 500,
                message: 'Internal Server Error',
                content: null
            };
        }
    }
}

export default new UserTypeService();
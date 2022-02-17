import { getRepository } from "typeorm";
import UserType from "../entities/UserTypeEntity";

class UserTypeService{
    async create(name: string, description: string, permission_level: number){
        try{
            const repository = getRepository(UserType);
            const exists = await repository.findOne({name});
            if(exists){
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
        catch{
            return {
                status: 500,
                message: 'Internal Server Error',
                content: null
            };
        }
    }
}

export default new UserTypeService();
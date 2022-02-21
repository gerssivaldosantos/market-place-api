import { IsEmail, IsString, IsUUID, Length, ValidateIf } from 'class-validator';

export class UserRequest{

    @ValidateIf(request => request.name !== undefined)
    @IsString()
    @Length(3, 60)
    name: string;

    @ValidateIf(request => request.user_type_id !== undefined)
    @IsString()
    @IsUUID()
    user_type_id: string;

    @ValidateIf(request => request.email !== undefined)
    @IsEmail()
    email: string;

    @ValidateIf(request => request.password !== undefined)
    @IsString()
    @Length(6, 60)
    password: string;

    constructor({name, user_type_id, email, password}:UserRequest){
        this.name = name;
        this.user_type_id = user_type_id;
        this.email = email;
        this.password = password;
    }

}
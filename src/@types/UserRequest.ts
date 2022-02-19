import { IsEmail, IsString, IsUUID, Length } from 'class-validator';

export class UserRequest{
    @Length(3, 60)
    name: string;
    @IsString()
    @IsUUID()
    user_type_id: string;
    @IsEmail()
    email: string;
    @Length(6, 60)
    password: string;
}
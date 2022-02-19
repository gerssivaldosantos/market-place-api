import { Contains, isEmail, isUUID, Length } from 'class-validator';

export class UserRequest{
    @Length(3, 60)
    name: string;
    @isUUID()
    user_type_id: string;
    @isEmail()
    email: string;
    @Length(6, 60)
    @Contains(number, lowercase, uppercase, special)
    password: string;
}
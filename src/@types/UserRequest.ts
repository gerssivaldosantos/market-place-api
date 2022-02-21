import { IsEmail, IsString, IsUUID, Length, ValidateIf } from 'class-validator';

export class UserRequest{

    @ValidateIf(o => o.otherProperty !== undefined)
    @IsString()
    @Length(3, 60)
    name: string;

    @ValidateIf(o => o.otherProperty !== undefined)
    @IsString()
    @IsUUID()
    user_type_id: string;

    @ValidateIf(o => o.otherProperty !== undefined)
    @IsEmail()
    email: string;

    @ValidateIf(o => o.otherProperty !== undefined)
    @IsString()
    @Length(6, 60)
    password: string;

}
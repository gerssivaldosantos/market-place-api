import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user_types')
export default class UserType{
    @PrimaryColumn()
    id: string;
    @Column()
    name: string;
    @Column()
    description: string;
    @Column()
    permission_level: number;
}
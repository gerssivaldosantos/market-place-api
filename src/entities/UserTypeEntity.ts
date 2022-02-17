import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
@Entity('user_types')
export default class UserType{
    @PrimaryColumn()
    id: string;
    @BeforeInsert()
    insertId(){
        this.id = uuid();
    }
    @Column()
    name: string;
    @Column()
    description: string;
    @Column()
    permission_level: number;
}
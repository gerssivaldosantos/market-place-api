import { Entity, Column, CreateDateColumn, PrimaryColumn, BeforeInsert, BeforeUpdate} from "typeorm";
import {v4 as uuid} from 'uuid';
import bcrypt from 'bcryptjs';

@Entity('users')
export class User {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;
    
    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 8);
    }
    
    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }



}
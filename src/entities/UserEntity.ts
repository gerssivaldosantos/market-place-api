import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn} from "typeorm";
import {v4 as uuid} from 'uuid';
import bcrypt from 'bcryptjs';
import UserType from "./UserTypeEntity";

@Entity('users')
export class User {

    @PrimaryColumn()
    id: string;
    @BeforeInsert()
    async generateId(){
        this.id = uuid();
    }
    @Column()
    user_type_id: string;

    @ManyToOne(()=> UserType)
    @JoinColumn({name:"user_type_id"})
    user_type: UserType;
    
    @Column()
    name: string;

    @Column()
    email: string;
    
    @Column({select: false})
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(){
        
        this.password = await bcrypt.hash(this.password, 8);
        this.updated_at = new Date();
    }

    }

import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn} from "typeorm";

import UserType from "./UserTypeEntity";

@Entity('users')
export class User {

    @PrimaryColumn()
    id: string;
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
    async update(){
        this.updated_at = new Date();
    }

    }

import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

Entity('products')
export class Product {
    @PrimaryColumn()
    id: string;
    @Column()
    description: string
    @Column()
    price: number
    @CreateDateColumn({name: 'created_at'})
    createdAt: Date; 
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date
}
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity('products')
export class Product {
    @PrimaryColumn()
    id: string;
    @Column()
    name: string
    @Column()
    description: string
    @Column()
    price: number
    @Column({ type: "bytea", nullable: false })
    image: Buffer
    @Column()
    owner_id: string
    @CreateDateColumn({name: 'created_at'})
    createdAt: Date; 
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date
}
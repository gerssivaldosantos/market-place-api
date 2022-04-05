import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn} from "typeorm";

@Entity('orders')
export class Order{
    @PrimaryColumn()
    id: string;
    @Column()
    customer_id: string;
    @Column()
    seller_id: string;
    @Column()
    product_id: string;
    @Column()
    quantity: number;
    @Column()
    paid: boolean;
    @Column()
    active: boolean;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
    @Column()
    desactived_at: Date;
    @Column()
    paid_at: Date;
}
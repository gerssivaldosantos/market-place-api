import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, OneToOne, JoinColumn, BeforeUpdate} from "typeorm";
import { Product } from "./ProductEntity";
import { User } from "./UserEntity";

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

    @OneToOne(()=> User)
    @JoinColumn({name:"customer_id"})
    customer: User;

    @OneToOne(()=> User)
    @JoinColumn({name:"seller_id"})
    seller: User;

    @OneToOne(()=> Product)
    @JoinColumn({name:"product_id"})
    product: Product;

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

    @BeforeUpdate()
    async update(){
        this.updated_at = new Date();
    }
}
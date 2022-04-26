import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";
import { Product } from "./ProductEntity";

@Entity('shopping_cart')
export class ShoppingCart{
    @PrimaryColumn()
    id: string;

    @Column()
    user_id: string;

    @Column()
    product_id: string;

    @OneToOne(()=> Product)
    @JoinColumn({name:"product_id"})
    product: Product;

    @Column()
    quantity: number;

}
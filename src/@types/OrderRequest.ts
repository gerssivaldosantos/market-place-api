import { IsNumber, IsUUID, ValidateIf } from 'class-validator'
export class OrderRequest{
    @ValidateIf(request => request.customer_id !== undefined)
    @IsUUID()
    customer_id: string;
    @ValidateIf(request => request.seller_id !== undefined)
    @IsUUID()
    seller_id: string;
    @ValidateIf(request => request.product_id !== undefined)
    @IsUUID()
    product_id: string;
    @ValidateIf(request => request.quantity !== undefined)
    @IsNumber({allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0})

        
}
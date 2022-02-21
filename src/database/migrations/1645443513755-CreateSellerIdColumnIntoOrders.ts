import {Column, MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class CreateSellerIdColumnIntoOrders1645443513755 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'orders',
            new TableColumn({
                name: 'seller_id',
                type: 'uuid',
                isNullable: true,
            })
        ),
        
        await queryRunner.createForeignKey(
            'orders',
            new TableForeignKey({
                columnNames: ['seller_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
            })
        )
    }

        

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('orders', 'orders_seller_id_foreign');
        await queryRunner.dropColumn('orders', 'seller_id');
    }

}

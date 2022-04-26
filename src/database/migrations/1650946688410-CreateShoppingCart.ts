import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateShoppingCart1650946688410 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: 'shopping_cart',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',
                    },
                    {
                        name: 'product_id',
                        type: 'uuid',
                    },
                    {
                        name: 'quantity',
                        type: 'int',
                    }
                ],
                foreignKeys: [
                    {
                        name: 'fk_user',
                        columnNames: ['user_id'],
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                    },
                    {
                        name: 'fk_product',
                        columnNames: ['product_id'],
                        referencedTableName: 'products',
                        referencedColumnNames: ['id'],
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('shopping_cart');
    }

}

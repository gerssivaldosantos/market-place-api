import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateOrders1645413267241 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'orders',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: 'customer_id',
                        type: 'uuid',
                        isNullable: false
                    },
                    {
                        name: 'product_id',
                        type: 'uuid',
                        isNullable: false
                    },
                    {
                        name: 'quantity',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'paid',
                        type: 'boolean',
                        isNullable: false,
                        default: false
                    },
                    {
                        name:'active',
                        type: 'boolean',
                        isNullable: false,
                        default: true

                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                        isNullable: false
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'desactived_at',
                        type: 'timestamp',
                        isNullable: true
                    },
                    {
                        name: 'paid_at',
                        type: 'timestamp',
                        isNullable: true,
                        default: null
                    }

                ],
                foreignKeys: [
                    {
                        name: 'fk_customer',
                        columnNames: ['customer_id'],
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
        await queryRunner.dropTable('orders');
    }

}

import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProducts1645412636888 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: 'products',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'price',
                        type: 'decimal',
                        isNullable: false
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
                        isNullable: false
                    }

                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('products')
    }

}

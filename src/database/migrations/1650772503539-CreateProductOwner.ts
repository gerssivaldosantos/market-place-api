import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class CreateProductOwner1650772503539 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'products',
            new TableColumn({
                name: 'owner_id',
                type: 'uuid',
                isNullable: false,
            })
        ),
        await queryRunner.createForeignKey(
            'products',
            new TableForeignKey({
                columnNames: ['owner_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
            }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('products', 'products_owner_id_foreign');
        await queryRunner.dropColumn('products', 'owner_id');
    }

}

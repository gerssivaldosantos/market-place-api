import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddProductImage1651884662885 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('products', new TableColumn({
            name: 'image',
            type: 'bytea',
            isNullable: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('products', 'image');
    }

}

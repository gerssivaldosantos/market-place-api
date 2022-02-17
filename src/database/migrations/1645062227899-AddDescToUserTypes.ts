import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddDescToUserTypes1645062227899 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.addColumn('user_types', new TableColumn({
            name: 'description',
            type: 'varchar',
            isNullable: true,
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropColumn('user_types', 'description');
    }

}

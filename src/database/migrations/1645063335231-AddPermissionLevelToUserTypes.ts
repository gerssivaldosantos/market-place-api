import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddPermissionLevelToUserTypes1645063335231 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('user_types', new TableColumn({
            name: 'permission_level',
            type: 'int',
            isNullable: false,
            default: 3,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('user_types', 'permission_level');
    }

}

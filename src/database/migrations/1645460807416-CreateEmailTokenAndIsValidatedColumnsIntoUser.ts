import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class CreateEmailTokenAndIsValidatedColumnsIntoUser1645460807416 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.addColumns(
            'users',
            [
                new TableColumn({
                    name: 'email_token',
                    type: 'varchar',
                    isNullable: true,
                }),
                new TableColumn({
                    name: 'is_validated',
                    type: 'boolean',
                    isNullable: false,
                })
            ]
        )
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropColumns('users', ['email_token', 'is_validated'])
    }

}

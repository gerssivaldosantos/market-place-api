import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1645056352309 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: 'users',
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true,
                            isUnique: true,
                        },
                        {
                            name: "user_type_id",
                            type: "uuid",
                        },
                        {
                            name: "name",
                            type: "varchar",
                        },
                        {
                            name: "email",
                            type: "varchar",
                            isNullable: false,
                            isUnique: true
                        },
                        {
                            name: "password",
                            type: "varchar",
                        },
                        {
                            name: "created_at",
                            type: "timestamp",
                            default: "now()",
                        },
                        {
                            name: "updated_at",
                            type: "timestamp",
                            default: "now()"
                        }
                    ],

                    foreignKeys: [
                        {
                            name: "fk_user_type",
                            columnNames: ["user_type_id"],
                            referencedTableName: "user_types",
                            referencedColumnNames: ["id"],
                        }
                    ]
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }
}

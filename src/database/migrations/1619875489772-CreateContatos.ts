import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateContatos1619875489772 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "contatos",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'


                    }, {
                        name: "user_id",
                        type: "int",

                    },
                    {
                        name: "email",
                        type: "varchar",

                    },
                    {
                        name: "telefone1",
                        type: "varchar",

                    },
                    {
                        name: "telefone2",
                        type: "varchar",

                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"

                    }

                ],
                foreignKeys: [
                    {
                        name: 'FK_contato_user',
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        columnNames: ['user_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE'


                    }
                ]
            })


        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('contatos');
    }

}

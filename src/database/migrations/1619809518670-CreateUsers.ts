import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1619809518670 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [{
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated:true,
                    generationStrategy: 'increment',
                    
                },
                {
                    name: 'cod_matricula',
                    type: 'bigint',
                    isUnique: true
                },
                {
                    name: 'nome',
                    type: 'varchar',
                },
                {
                    name: 'cpf',
                    type: 'varchar',

                },
                 {
                    name: 'cargo',
                    type: 'varchar',

                },
                {
                    name: 'rua',
                    type: 'varchar',

                },
                {
                    name: 'bairro',
                    type: 'varchar',
                },
                {
                    name: 'cidade',
                    type: 'varchar',
                },
                {
                    name: 'ativo',
                    type: 'boolean',
                    default: true,
                },
                {
                    name: 'hora_ini_expediente',
                    type: "timestamp",
                },
                {
                    name: 'hora_ini_almoco',
                    type: "timestamp",
                },
                {
                    name: 'hora_fim_almoco',
                    type: "timestamp",
                },
                {
                    name: 'hora_fim_expediente',
                    type: "timestamp",
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                }

                ]

            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}

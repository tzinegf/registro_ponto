import { Column, MigrationInterface, QueryRunner, Table } from "typeorm";


export class CreateExpediente1619886285936 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'expedientes',
                columns: [
                    {
                        name: 'id',
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'user_id',
                        type: "int",
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
                    }
                ],
                foreignKeys:[
                    {
                        name:'FK_epediente_user',
                        referencedTableName:'users',
                        referencedColumnNames:['id'],
                        columnNames:['user_id'],
                        onDelete:'CASCADE',
                        onUpdate:'CASCADE'
                        

                }
            ]
                


            })

        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('expedientes')
    }

}

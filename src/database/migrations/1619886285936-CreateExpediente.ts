import { Column, MigrationInterface, QueryRunner, Table } from "typeorm";


export class CreateExpediente1619886285936 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'registros',
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
                        name:'count_times',
                        type:'int',
                        isNullable:true

                    },
                    {
                        name: 'hora_ini_expediente',
                        type: "Datetime",
                        isNullable:true
                    },
                    {
                        name: 'hora_ini_almoco',
                        type: "Datetime",
                        isNullable:true
                    },
                    {
                        name: 'hora_fim_almoco',
                        type: "Datetime",
                        isNullable:true
                    },
                    {
                        name: 'hora_fim_expediente',
                        type: "Datetime",
                        isNullable:true
                    },
                    {
                        name: 'end_of_day',
                        type: "boolean",
                        default: false
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
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
        await queryRunner.dropTable('registros')
    }

}

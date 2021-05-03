import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";
@Entity("users")
class User {

    @PrimaryColumn()
    id: number;

    @Column()
    cod_matricula: number;

    @Column()
    nome: string;

    @Column()
    cpf: string;

    @Column()
    cargo: string;

    @Column()
    rua: string;

    @Column()
    bairro: string;

    @Column()
    cidade: string;

    @Column()
    telefone1: string;

    @Column()
    telefone2: string

    @Column()
    ativo: boolean;

    @Column()
    hora_ini_expediente: Date;

    @Column()
    hora_ini_almoco: Date;

    @Column()
    hora_fim_almoco: Date;

    @Column()
    hora_fim_expediente: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @CreateDateColumn()
    created_at: Date;
    constructor() {


    }
}

export { User };
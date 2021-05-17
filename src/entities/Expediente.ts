import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm'
import { User } from './User';
@Entity('registros')
class Expediente {

    @PrimaryColumn()
    id: number;

    @Column()
    hora_ini_expediente: Date;

    @Column()
    count_times: number;

    @Column()
    hora_ini_almoco: Date;

    @Column()
    hora_fim_almoco: Date;

    @Column()
    hora_fim_expediente: Date;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    end_of_day: boolean;

    @JoinColumn({ name: "user_id" })
    @ManyToOne(() => User)
    user: User

    @Column()
    user_id: number;



}

export { Expediente }
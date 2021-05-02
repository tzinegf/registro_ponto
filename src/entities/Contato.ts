import { Entity, PrimaryColumn, Column, CreateDateColumn, JoinColumn, ManyToOne } from "typeorm"
import { User } from "./User";


@Entity('contatos')
class Contato {

    @PrimaryColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    telefone1: string;

    @Column()
    telefone2: string

    @CreateDateColumn()
    created_at: Date;

    @JoinColumn({name:"user_id"})
    @ManyToOne(() => User)
    user: User

    @CreateDateColumn()
    user_id: number;

    constructor(){
        
    }




}
export { Contato };
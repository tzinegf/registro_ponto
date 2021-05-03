import { json } from 'express';
import { getCustomRepository, Repository } from 'typeorm'
import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';



interface IuserCreate {

    id?: number;
    cod_matricula: number;
    nome: string;
    cpf: string;
    cargo: string;
    rua: string;
    bairro: string;
    cidade: string;
    telefone1: string,
    telefone2: string,
    hora_fim_almoco: Date;
    hora_ini_almoco: Date;
    hora_fim_expediente: Date
    hora_ini_expediente: Date;
    ativo?: boolean;
}

class UserService {
    private userRepository: Repository<User>

    constructor() {
        this.userRepository = getCustomRepository(UserRepository)

    }

    async create({ id, cod_matricula, nome, cpf, cargo, rua, bairro, cidade, telefone1, telefone2, hora_fim_almoco, hora_ini_almoco, hora_fim_expediente, hora_ini_expediente }: IuserCreate) {


        // verifica se o email ja existe
        const userAlreadyExists = await this.userRepository.findOne({
            cod_matricula
        })
        // se exixtir retorna o contato
        if (userAlreadyExists) {
            throw new Error("Usuario ja cadastrado!")
        }
        const users = this.userRepository.create({
            id,
            cod_matricula,
            nome,
            cpf,
            cargo,
            rua,
            cidade,
            bairro,
            telefone1,
            telefone2,
            hora_ini_expediente,
            hora_fim_expediente,
            hora_fim_almoco,
            hora_ini_almoco,
        });
        await this.userRepository.save(users);
        return users;
    }
    async listAllUsers() {

        const list = await this.userRepository.find({
            select: [
                "id",
                "cod_matricula",
                "nome",
                "cpf",
                "cargo",
                "rua",
                "cidade",
                "bairro",
                "telefone1",
                "telefone2",
                "hora_ini_expediente",
                "hora_fim_expediente",
                "hora_fim_almoco",
                "hora_ini_almoco",]
        });

        return list;
    }
    async listUser(id:number) {
        const list = await this.userRepository.findOne({
            id
        })
        if (list) {
            return list;
        }else{
            throw new Error("Usuario não encontrado!")
             
        }
    }

    async activeUser(id:number,status:boolean){
        const userAlreadyExists = await this.userRepository.findOne({
            id
        })
        if (userAlreadyExists) {
            const active = await this.userRepository.update(id, { ativo: status})
            return {message:"ok"};  
        }else{
            throw new Error("Usuario não encontrado!")
             
        }
 
    }
    async editUser(id: number,nome: string,cpf: string,cargo: string,rua: string,
        bairro: string,cidade: string,telefone1: string,telefone2: string,hora_fim_almoco: Date,hora_ini_almoco: Date,
        hora_fim_expediente: Date,hora_ini_expediente: Date){

        const userAlreadyExists = await this.userRepository.findOne({
            id
        })
        if (userAlreadyExists) {
            const active = await this.userRepository.update(id, {nome:nome,cpf:cpf,cargo:cargo,rua:rua,cidade:cidade,bairro:bairro,telefone1:telefone1,telefone2:telefone2,hora_fim_almoco:hora_fim_almoco,hora_fim_expediente:hora_fim_expediente,hora_ini_almoco:hora_ini_almoco,hora_ini_expediente:hora_ini_expediente})
            
            return {message:"ok"};  
        }else{
            throw new Error("Usuario não encontrado!")
             
        }
 
    }
}
export { UserService };
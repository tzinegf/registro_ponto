import { json } from 'express';
import { getCustomRepository, Repository } from 'typeorm'
import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';



interface IuserCreate {

    id?: number;
    count_times?: number;
    cod_matricula: number;
    nome: string;
    cpf: string;
    cargo: string;
    rua: string;
    bairro: string;
    cidade: string;
    telefone1: string,
    telefone2: string,
    hora_fim_almoco: String;
    hora_ini_almoco: String;
    hora_fim_expediente: String
    hora_ini_expediente: String;
    ativo?: boolean;
}

class UserService {
    private userRepository: Repository<User>

    constructor() {
        this.userRepository = getCustomRepository(UserRepository)

    }

    async create({ id, cod_matricula, nome, cpf, cargo, rua, bairro, cidade, telefone1, telefone2, hora_fim_almoco, hora_ini_almoco, hora_fim_expediente, hora_ini_expediente, ativo }: IuserCreate) {


        // verifica se o email ja existe
        const userAlreadyExists = await this.userRepository.findOne({
            cod_matricula
        })
        // se exixtir retorna o contato
        if (userAlreadyExists) {
            return ("Usuário já cadastrado!")
        }
        try {
            const users = this.userRepository.create({
                id,
                cod_matricula,
                nome,
                cpf,
                cargo,
                rua,
                ativo,
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
            return 'ok';

        } catch (e) {
            return e.message
        }


    }
    async listAllUsers() {

        const list = await this.userRepository.find({
            select: [
                "id",
                "ativo",
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
    async listUser(id: number) {
        const list = await this.userRepository.findOne({
            id
        })
        if (list) {
            return list;
        } else {
            throw new Error("Usuario não encontrado!")

        }
    }


    async editUser(id: number, nome: string, cargo: string, rua: string,
        bairro: string, cidade: string, telefone1: string, telefone2: string, hora_fim_almoco: String, hora_ini_almoco: String,
        hora_fim_expediente: String, hora_ini_expediente: String, ativo: boolean) {

        const userAlreadyExists = await this.userRepository.findOne({
            id
        })
        if (userAlreadyExists) {
            const active = await this.userRepository.update(id, { nome: nome, cargo: cargo, rua: rua, cidade: cidade, bairro: bairro, telefone1: telefone1, telefone2: telefone2, hora_fim_almoco: hora_fim_almoco, hora_fim_expediente: hora_fim_expediente, hora_ini_almoco: hora_ini_almoco, hora_ini_expediente: hora_ini_expediente, ativo })

            return 'ok';
        } else {
            throw new Error("Usuario não encontrado!")

        }

    }
}
export { UserService };
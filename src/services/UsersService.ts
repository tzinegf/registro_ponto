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
    hora_fim_almoco: Date;
    hora_ini_almoco: Date;
    hora_fim_expediente: Date
    hora_ini_expediente: Date;
    ativo?: boolean;
}

class UserService {
    private userRepository: Repository<User>

    constructor(){
        this.userRepository = getCustomRepository(UserRepository)

    }

    async create({id,cod_matricula, nome, cpf, cargo, rua, bairro, cidade, hora_fim_almoco, hora_ini_almoco, hora_fim_expediente, hora_ini_expediente }: IuserCreate) {


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
            hora_ini_expediente,
            hora_fim_expediente,
            hora_fim_almoco,
            hora_ini_almoco,
        });
        await this.userRepository.save(users);
        return users;
    }
}
export { UserService };
import { getCustomRepository, Repository } from "typeorm"
import { Expediente } from "../entities/Expediente";
import { ExpedienteRepository } from "../repositories/ExpedienteRepository"

interface IexpedienteCreate {
    hora_fim_almoco: Date;
    hora_ini_almoco: Date;
    hora_fim_expediente: Date
    hora_ini_expediente: Date;
    user_id: number;
}
class ExpedientesService {

    private expedientesRepository: Repository<Expediente>

    constructor(){
        this.expedientesRepository = getCustomRepository(ExpedienteRepository)

    }

    async create({ hora_fim_almoco, hora_ini_almoco, hora_fim_expediente, hora_ini_expediente, user_id }: IexpedienteCreate) {
        
        const expediente = this.expedientesRepository.create({
            hora_fim_almoco,
            hora_ini_almoco,
            hora_fim_expediente,
            hora_ini_expediente,
            user_id

        });
        await this.expedientesRepository.save(expediente);
        return expediente;
    }

    async listByUser(user_id: number) {

        const list = await this.expedientesRepository.find({
            where: { user_id },
            relations: ['user']
        }

        );

        return list;

    }


}
export { ExpedientesService }
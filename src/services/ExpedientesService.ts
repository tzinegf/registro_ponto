import { getCustomRepository } from "typeorm"
import { ExpedienteRepository } from "../repositories/ExpedienteRepository"

interface IexpedienteCreate {
    hora_fim_almoco: Date;
    hora_ini_almoco: Date;
    hora_fim_expediente: Date
    hora_ini_expediente: Date;
    user_id: number;
}
class ExpedientesService {

    async create({ hora_fim_almoco, hora_ini_almoco, hora_fim_expediente, hora_ini_expediente, user_id }: IexpedienteCreate) {
        const expedientesRepository = getCustomRepository(ExpedienteRepository);
        const expediente = expedientesRepository.create({
            hora_fim_almoco,
            hora_ini_almoco,
            hora_fim_expediente,
            hora_ini_expediente,
            user_id

        });
        await expedientesRepository.save(expediente);
        return expediente;
    }

    async listByUser(user_id: number) {
        const expedientesRepository = getCustomRepository(ExpedienteRepository);

        const list = await expedientesRepository.find({
            where: { user_id },
            relations: ['user']
        }

        );

        return list;

    }


}
export { ExpedientesService }
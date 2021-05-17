import { getCustomRepository, Repository } from "typeorm"
import { Expediente } from "../entities/Expediente";
import { User } from "../entities/User";
import { ExpedienteRepository } from "../repositories/ExpedienteRepository"
import { UserRepository } from "../repositories/UserRepository";

class ExpedientesService {

    private expedientesRepository: Repository<Expediente>
    private userRepository: Repository<User>

    constructor() {
        this.expedientesRepository = getCustomRepository(ExpedienteRepository)
        this.userRepository = getCustomRepository(UserRepository)

    }

    async create({ id, hora_ini_expediente, count_times, created_at, hora_ini_almoco, hora_fim_almoco, hora_fim_expediente, end_of_day, cod_matricula }) {

        const user_cod = await this.userRepository.createQueryBuilder('users')
            .where("cod_matricula= :cod_matricula", { cod_matricula: cod_matricula })
            .getOne();

        if (user_cod != undefined) {

            const user_id = user_cod.id

            const count = await this.expedientesRepository.
                createQueryBuilder("registros")
                .where("user_id = :user_id", { user_id: user_id })
                .getOne();

            const day = count.created_at.getDate()
            const newDate = new Date(created_at);
            const day2 = newDate.getDate();

            if (day == day2) {
                if (count == undefined || (count.count_times == 0 && count.end_of_day == false)) {
                    var expediente = this.expedientesRepository.createQueryBuilder()
                        .insert()
                        .into(Expediente)
                        .values({ user_id: user_id, id: id, hora_ini_expediente: hora_ini_expediente, count_times: 1, created_at: created_at, end_of_day: end_of_day })
                        .execute()

                    return "1";


                } else {

                    return this.updateExpediente({ user_id, id, hora_ini_almoco, hora_fim_almoco, hora_fim_expediente, count_times, created_at, end_of_day });


                }

            }
            else {
                return 'Todos os pontos já foram registrados na data atual!'
            }



        } else {
            return 'usuário não encontrado!'
        }






    }

    async updateExpediente({ user_id, id, hora_ini_almoco, hora_fim_almoco, hora_fim_expediente, count_times, created_at, end_of_day }) {

        const count = await this.expedientesRepository.
            createQueryBuilder("registros")
            .where("user_id = :user_id", { user_id: user_id })
            .andWhere("count_times = :count_times", { count_times: count_times })
            .getOne();

        if (count != undefined && count.end_of_day == false) {
            const day = count.created_at.getDate()
            const newDate = new Date(created_at);
            const day2 = newDate.getDate();

            if (day == day2 && count.hora_fim_expediente == null && count.end_of_day == false) {

                if (count.count_times == 1) {

                    await this.expedientesRepository.createQueryBuilder()
                        .update(Expediente)
                        .set({ count_times: 2, hora_ini_almoco: hora_ini_almoco })
                        .andWhere("user_id = :user_id ", { user_id: user_id })
                        .execute();
                    return "2";


                } else if (count.count_times == 2) {
                    await this.expedientesRepository.createQueryBuilder()
                        .update(Expediente)
                        .set({ count_times: 3, hora_fim_almoco: hora_fim_almoco })
                        .where("user_id = :user_id ", { user_id: user_id })
                        .execute();
                    return "3"

                } else if (count.count_times == 3) {
                    await this.expedientesRepository.createQueryBuilder()
                        .update(Expediente)
                        .set({ count_times: 0, hora_fim_expediente: hora_fim_expediente, end_of_day: end_of_day })
                        .where("user_id = :user_id", { user_id: user_id })
                        .execute();
                    return "0"

                }


            } else {
                return ('Todos os pontos já foram registrados na data atual')
            }
        } else {

            return ('Todos os pontos já foram registrados na data atual')

        }




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
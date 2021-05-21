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

    async create({ id, hora_ini_expediente, count_times, created_at, hora_ini_almoco, hora_fim_almoco, hora_fim_expediente, cod_matricula }) {

        const user_cod = await this.userRepository.createQueryBuilder('users')
            .where("cod_matricula= :cod_matricula", { cod_matricula: cod_matricula })
            .getOne();


        if (user_cod != undefined) {

            const user_id = user_cod.id

            const reg = await this.expedientesRepository.
                createQueryBuilder("registros")
                .where("user_id = :user_id", { user_id: user_id })
                .andWhere(" DATE_FORMAT(created_at, '%Y-%m-%d') = CURDATE()")
                .getOne();

            /*const day = reg.created_at.getDate()
            const newDate = new Date(created_at);
            const day2 = newDate.getDate();*/


            if (reg != undefined) {
                return this.updateExpediente({ user_id, id, hora_ini_almoco, hora_fim_almoco, hora_fim_expediente, count_times, created_at });
            } else {

                var expediente = this.expedientesRepository.createQueryBuilder()
                    .insert()
                    .into(Expediente)
                    .values({ user_id: user_id, id: id, hora_ini_expediente: hora_ini_expediente, count_times: 1, created_at: created_at })
                    .execute()

                return "1";

            }

        } else {
            return 'Usuário não encontrado!'
        }






    }

    async updateExpediente({ user_id, id, hora_ini_almoco, hora_fim_almoco, hora_fim_expediente, count_times, created_at }) {


        console.log(hora_ini_almoco);
        if (count_times != 0) {

            if (count_times == 1) {

                await this.expedientesRepository.createQueryBuilder()
                    .update(Expediente)
                    .set({ count_times: 2, hora_ini_almoco: hora_ini_almoco })
                    .andWhere("user_id = :user_id ", { user_id: user_id })
                    .execute();

                return "2";


            } else if (count_times == 2) {
                await this.expedientesRepository.createQueryBuilder()
                    .update(Expediente)
                    .set({ count_times: 3, hora_fim_almoco: hora_fim_almoco })
                    .where("user_id = :user_id ", { user_id: user_id })
                    .execute();
                return "3"

            } else if (count_times == 3) {
                await this.expedientesRepository.createQueryBuilder()
                    .update(Expediente)
                    .set({ count_times: 0, hora_fim_expediente: hora_fim_expediente })
                    .where("user_id = :user_id", { user_id: user_id })
                    .execute();
                return "4"

            }
        } else {

            return ('Todos os pontos já foram registrados na data atual')

        }

    }


    async getCount(cod_matricula: String) {

        const user_cod = await this.userRepository.createQueryBuilder('users')
            .where("cod_matricula = :cod_matricula", { cod_matricula: cod_matricula })
            .getOne();


        if (user_cod != undefined) {

            const user_id = user_cod.id

            const count = await this.expedientesRepository.
                createQueryBuilder("registros")
                .where("user_id = :user_id", { user_id: user_id })
                .andWhere(" DATE_FORMAT(created_at, '%Y-%m-%d') = CURDATE()")
                .andWhere("hora_ini_almoco is NULL OR hora_fim_almoco is NULL OR hora_fim_expediente is NULL ")
                .getOne();

            return count;

        } else {
            return 'Usuário não encontrado!'
        }

    }




    async listByUser(user_id: number) {

        const list = await this.expedientesRepository.find({
            where: { user_id }
        }

        );

        return list;

    }


    async getRelatoryDay(hora_ini,hora_fim) {
         const data = await this.userRepository.query("SELECT T1.nome, T1.user_id, T1.usuarioAtivo, IF(T1.idReg IS NOT NULL, 1, 0) AS existeRegistroPonto, T1.hora_ini, T1.hora_saida_intervalo, T1.hora_retorno_intervalo, T1.hora_saida, T1.horasTrab1Turno, T1.horasTrab2Turno, TIME(T1.horasTrab1Turno + T1.horasTrab2Turno) AS horasTrabTotais FROM(SELECT RG.id AS idReg, US.ativo AS usuarioAtivo, US.nome, US.id AS user_id, RG.hora_ini_expediente AS hora_ini, RG.hora_ini_almoco AS hora_saida_intervalo, RG.hora_fim_almoco AS hora_retorno_intervalo, RG.hora_fim_expediente AS hora_saida, IF(RG.hora_ini_almoco IS NOT NULL, TIMEDIFF(RG.hora_ini_almoco, RG.hora_ini_expediente), TIME('00:00:00')) AS horasTrab1Turno,IF(RG.hora_fim_expediente IS NOT NULL, TIMEDIFF(RG.hora_fim_expediente, RG.hora_fim_almoco), TIME('00:00:00')) AS horasTrab2Turno FROM users US LEFT JOIN registros RG ON RG.user_id = US.id AND RG.hora_ini_expediente BETWEEN ? AND ? WHERE 1) AS T1 HAVING usuarioAtivo = 1 OR (usuarioAtivo = 0 AND existeRegistroPonto = 1)",[hora_ini,hora_fim])
         
         return data

    }


}







export { ExpedientesService }
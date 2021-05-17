import { Request, Response } from 'express'
import { ExpedientesService } from '../services/ExpedientesService';

class ExpedientesController {

    async create(req: Request, res: Response): Promise<Response> {
        const { id, hora_ini_expediente, count_times,created_at,hora_ini_almoco,hora_fim_almoco,hora_fim_expediente,end_of_day,cod_matricula} = req.body
        const expedientesService = new ExpedientesService()


        try {
            const expediente = await expedientesService.create(
                { id, hora_ini_expediente, count_times,created_at,hora_ini_almoco,hora_fim_almoco,hora_fim_expediente,end_of_day,cod_matricula })
            return res.json(expediente)
        } catch (err) {
            return res.status(400).json({
                message: err.message
            })

        }
    }

    async showByuser(req: Request, res: Response) {
        const { id } = req.params;
        const expedientesService = new ExpedientesService();

        const list = await expedientesService.listByUser(parseInt(id));

        return res.json(list);


    }
/*
    async updateExpediente(req: Request, res: Response) {
        const { id, hora_ini_expediente, count_times,created_at} = req.body
        const { user_id } = req.params;
        const expedientesService = new ExpedientesService();
        const list = await expedientesService.updateExpediente({user_id,id, hora_ini_expediente,count_times,created_at,hora_ini_almocohora_fim_almoco,hora_fim_expediente });

        return res.json(list);




    }
*/





}

export { ExpedientesController }
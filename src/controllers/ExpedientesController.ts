import { Request, Response } from 'express'
import { ExpedientesService } from '../services/ExpedientesService';

class ExpedientesController {

    async create(req: Request, res: Response): Promise<Response> {
        const { hora_fim_almoco, hora_ini_almoco, hora_fim_expediente, hora_ini_expediente, user_id } = req.body

        const expedientesService = new ExpedientesService()
        try {
            const expediente = await expedientesService.create({
                hora_fim_almoco,
                hora_ini_almoco,
                hora_fim_expediente,
                hora_ini_expediente,
                user_id
            })
            return res.json(expediente)
        } catch (err) {
            return res.status(400).json({
                message: err.message
            })

        }
    }

    async showByuser(req:Request, res:Response){
        const {id} = req.params;
        const expedientesService = new ExpedientesService();

        const list = await expedientesService.listByUser(parseInt(id));
        
        return res.json(list);


    }


}

export { ExpedientesController }
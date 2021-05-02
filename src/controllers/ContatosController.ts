import { Request, Response } from 'express'
import { ContatosService } from '../services/ContatosService';

class ContatosController {

    async create(req: Request, res: Response): Promise<Response> {
        const { id, email, telefone1, telefone2,user_id } = req.body

        const contatosService = new ContatosService()
        try {
            const contato = await contatosService.create({ id, email, telefone1, telefone2,user_id })
            return res.json(contato)
        } catch (err) {
            return res.status(400).json({
                message: err.message
            })

        }
    }


}

export { ContatosController }
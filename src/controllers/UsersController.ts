import {Request,Response} from 'express'
import { UserService } from '../services/UsersService';

class UsersController {

    async create (req:Request, res:Response){
        const { cod_matricula, nome, cpf, cargo, rua, bairro, cidade, id,hora_fim_almoco,hora_ini_almoco,hora_fim_expediente,hora_ini_expediente} = req.body

        const usersService = new UserService()
        try{
            const user = await usersService.create({cod_matricula, nome, cpf, cargo, rua, bairro, cidade, id,hora_fim_almoco,hora_ini_almoco,hora_fim_expediente,hora_ini_expediente})
            return res.json(user)
        }catch(err){
            return res.status(400).json({
                message:err.message
            })

        }
    }


}

export {UsersController}
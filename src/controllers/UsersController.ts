import { Request, Response } from 'express'
import { UserService } from '../services/UsersService';

class UsersController {

    async create(req: Request, res: Response) {
        const { cod_matricula, nome, cpf, cargo, rua, bairro, cidade, id, hora_fim_almoco, hora_ini_almoco, hora_fim_expediente, hora_ini_expediente, telefone1, telefone2 } = req.body

        const usersService = new UserService()
        try {
            const user = await usersService.create({ cod_matricula, nome, cpf, cargo, rua, bairro, cidade, id, hora_fim_almoco, hora_ini_almoco, hora_fim_expediente, hora_ini_expediente, telefone1, telefone2 });

            return res.json(user)
        } catch (err) {
            return res.status(400).json({
                message: err.message
            })

        }
    }

    async listAllUsers(req: Request, res: Response) {
        const userService = new UserService();

        const list = await userService.listAllUsers();

        return res.json(list);


    }
    async listUser(req: Request, res: Response) {
        const { id } = req.params;
        const userService = new UserService();

        try {
            const user = await userService.listUser(parseInt(id));

            return res.json(user);
        } catch (err) {
            return res.status(400).json({
                message: err.message
            })

        }
    }

    async activeUser(req: Request, res: Response) {
        const { id, status } = req.params;
        const userService = new UserService();

        var isTrueSet = (status == 'true');

        try {
            const resposta = await userService.activeUser(parseInt(id), isTrueSet);
            return res.json(resposta)
        } catch (err) {
            return res.status(400).json({
                message: err.message
            })

        }
    }
    async editUser(req: Request, res: Response) {
        const {id,nome, cpf, cargo, rua, cidade,bairro, telefone1, telefone2,hora_fim_almoco, hora_ini_almoco, hora_fim_expediente, hora_ini_expediente } = req.params;
        const userService = new UserService();


        try {
            const resposta = await userService.editUser(parseInt(id),nome, cpf, cargo, rua, cidade, bairro, telefone1, telefone2,new Date(hora_fim_almoco), new Date(hora_fim_expediente),new Date(hora_ini_almoco) , new Date(hora_ini_expediente));
            return res.json(resposta)
        } catch (err) {
            return res.status(400).json({
                message: err.message
            })

        }
    }



}

export { UsersController }
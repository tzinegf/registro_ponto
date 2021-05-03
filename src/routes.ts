import { Router } from 'express'
import { ExpedientesController } from './controllers/ExpedientesController';
import { UsersController } from './controllers/UsersController';
const routes = Router();


const userController = new UsersController();
const expedienteController = new ExpedientesController();

routes.post('/createuser', userController.create);
routes.get('/users', userController.listAllUsers);
routes.get('/user/:id', userController.listUser);
routes.patch('/edituser/:id/:nome/:cpf/:cargo/:rua/:bairro/:cidade/:telefone1/:telefone2/:hora_fim_almoco/:hora_ini_almoco/:hora_fim_expediente/:hora_ini_expediente', userController.editUser);
routes.patch('/activeuser/:id/:status', userController.activeUser);

routes.post('/newexpediente', expedienteController.create);
routes.get('/expedientes/:id', expedienteController.showByuser);

export { routes };
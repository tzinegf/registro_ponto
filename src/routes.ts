import { Router } from 'express'
import { ExpedientesController } from './controllers/ExpedientesController';
import { UsersController } from './controllers/UsersController';
const routes = Router();


const userController = new UsersController();
const expedienteController = new ExpedientesController();

routes.post('/createuser', userController.create);
routes.get('/users', userController.listAllUsers);
routes.get('/user/:id', userController.listUser);
routes.patch('/edituser/:id', userController.editUser);

routes.post('/newexpediente', expedienteController.create);
routes.get('/count/:cod_matricula', expedienteController.getCount);
routes.post('/relatoryday', expedienteController.getRelatoryDay);
//routes.patch('/newexpediente/:user_id', expedienteController.updateExpediente);
routes.get('/expedientes/:id', expedienteController.showByuser);

export { routes };
import { Router } from 'express'
import { ContatosController } from './controllers/ContatosController';
import { ExpedientesController } from './controllers/ExpedientesController';
import { UsersController } from './controllers/UsersController';
const routes = Router();


const userController = new UsersController();
const contatoController = new ContatosController();
const expedienteController = new ExpedientesController();

routes.post('/users', userController.create);

routes.post('/contatos', contatoController.create);

routes.post('/expedientes', expedienteController.create);
routes.get('/expedientes/:id', expedienteController.showByuser);

export { routes };
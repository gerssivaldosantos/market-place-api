import { Router } from "express";
import OrderController from "./controllers/OrderController";
import UserController from "./controllers/UserController";
import UserTypeController from "./controllers/UserTypeController";
import RequestValidator from "./middlewares/RequestValidator";
/* basic router for hello world */

const routes = Router();

/* Users */
routes.get('/users', UserController.getAll);

routes.post('/users', 
    RequestValidator.user,
    UserController.create);

routes.get('/users/:id', UserController.getById);

routes.put('/users/:id', 
    RequestValidator.user,
    UserController.update);

routes.delete('/users/:id', UserController.delete);

/* User types */
routes.get('/user_types', UserTypeController.getAll);

routes.post('/user_types', UserTypeController.create);

/* Orders */

routes.get('/orders', OrderController.getAll);

export default routes;
import { Router } from "express";
import UserController from "./controllers/UserController";
import UserTypeController from "./controllers/UserTypeController";
/* basic router for hello world */

const routes = Router();

/* Users */
routes.get('/users', UserController.getAll);
routes.post('/users', UserController.create);
/* 
routes.get('/users/:id', UserController.getById);
routes.put('/users:id', UserController.update);
routes.delete('/users:id', UserController.delete); */


/* User types */
routes.get('/user_types', UserTypeController.getAll);
routes.post('/user_types', UserTypeController.create);


export default routes;
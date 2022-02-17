import { Router } from "express";
import UserController from "./controllers/UserController";
import UserTypeController from "./controllers/UserTypeController";
/* basic router for hello world */

const routes = Router();

routes.get('/', (req, res) => { res.send("Hello World!"); });
routes.get('/users', UserController.getAll);
routes.post('/user_types', UserTypeController.create);


export default routes;
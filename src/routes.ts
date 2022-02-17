import { Router } from "express";
import UserController from "./controllers/UserController";

/* basic router for hello world */

const routes = Router();

routes.get('/', (req, res) => { res.send("Hello World!"); });
routes.get('/users', UserController.getAll);
routes.post('/users', UserTypeController.create);


export default routes;
import { Router } from "express";
import AuthController from "./controllers/AuthController";
import OrderController from "./controllers/OrderController";
import UserController from "./controllers/UserController";
import UserTypeController from "./controllers/UserTypeController";
import AuthMiddleware from "./middlewares/AuthMiddleware";
import RequestValidator from "./middlewares/RequestValidator";
import ValidateMiddleware from "./middlewares/ValidateMiddleware";
/* basic router for hello world */

const routes = Router();

/* Users */
routes.get('/users',
    AuthMiddleware.checkToken,
    UserController.getAll);

routes.post('/users',
    RequestValidator.user,
    UserController.create);

routes.get('/users/:id',
    AuthMiddleware.checkToken,
    UserController.getById);

routes.put('/users/:id',
    RequestValidator.user,
    AuthMiddleware.checkCredentials,
    UserController.update);

routes.delete('/users/:id', UserController.delete);

/* Authenticate */

routes.post('/auth',
    RequestValidator.user,
    AuthMiddleware.checkCredentials,
    ValidateMiddleware.validateEmail,
    AuthController.authenticate);

routes.get('/validate_email/:email_token', AuthController.activate);

/* User types */
routes.get('/user_types', UserTypeController.getAll);

routes.post('/user_types', UserTypeController.create);

/* Orders */

routes.post('/orders', OrderController.create);
routes.get('/orders', OrderController.getAll);

export default routes;
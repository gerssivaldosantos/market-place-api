import { Router } from "express";
import AuthController from "./controllers/AuthController";
import OrderController from "./controllers/OrderController";
import UserController from "./controllers/UserController";
import UserTypeController from "./controllers/UserTypeController";
import AuthMiddleware from "./middlewares/AuthMiddleware";
import RequestValidator from "./middlewares/RequestValidator";
import ValidateMiddleware from "./middlewares/ValidateMiddleware";

const routes = Router();

/* Users */

//Get all users
routes.get('/users',
    AuthMiddleware.checkToken,
    UserController.getAll);

//Create an User
routes.post('/users',
    RequestValidator.user,
    UserController.create);

//Get an User
routes.get('/users/:id',
    AuthMiddleware.checkToken,
    UserController.getById);

//Update an User
routes.put('/users/:id',
    RequestValidator.user,
    AuthMiddleware.checkCredentials,
    UserController.update);

//Delete an User
routes.delete('/users/:id', UserController.delete);

/* Authenticate */

//Auth an user
routes.post('/auth',
    RequestValidator.user,
    AuthMiddleware.checkCredentials,
    ValidateMiddleware.validateEmail,
    AuthController.authenticate);

//Validate an user email
routes.get('/validate_email/:email_token', AuthController.activate);

/* User types */

//Get all user types
routes.get('/user_types', UserTypeController.getAll);

//Create an User type
routes.post('/user_types', UserTypeController.create);

routes.put('/user_types/:id', UserTypeController.update);
/* Orders */

routes.post('/orders', OrderController.create);
routes.get('/orders', OrderController.getAll);

export default routes;
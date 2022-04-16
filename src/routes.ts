import { Router } from "express";
import AuthController from "./controllers/AuthController";
import OrderController from "./controllers/OrderController";
import ProductController from "./controllers/ProductController";
import UserController from "./controllers/UserController";
import UserTypeController from "./controllers/UserTypeController";
import AuthMiddleware from "./middlewares/AuthMiddleware";
import RequestValidator from "./middlewares/RequestValidator";
import ValidateMiddleware from "./middlewares/ValidateMiddleware";

const routes = Router();

/* Default route */

routes.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
})

/* Utility routes */

routes.post('/check-token', AuthMiddleware.checkToken, (req, res) => {
    res.status(201).json({
        message: 'Token is valid'
    })
})

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
        RequestValidator.user,
        AuthMiddleware.checkToken,
        RequestValidator.isSelfRequest,
        UserController.getById);

    //Update an User
    routes.put('/users/:id',
        RequestValidator.user,
        AuthMiddleware.checkToken,
        RequestValidator.isSelfRequest,
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
    routes.get('/validate-email/:email-token', AuthController.activate);

    //get user id by token in header authorization
    routes.get('/user', 
        AuthMiddleware.checkToken,
        AuthController.getUserByToken);

    //call Rescue password by email
    routes.post('/rescue-password', AuthController.rescuePassword)

    //call change password by token
    routes.post('/change-password', AuthController.changePassword)

/* User types */

    //Get all user types
    routes.get('/user-types', UserTypeController.getAll);

    //Create an User type
    routes.post('/user-types', 
        UserTypeController.create);

    routes.put('/user-types/:id', UserTypeController.update);
    
/* Orders */

    routes.post('/orders', OrderController.create);
    routes.get('/orders/:id', OrderController.getById);
    routes.get('/orders', OrderController.getAll);

/* Products */

    routes.get('/products', ProductController.getAll);
    routes.get('/products/:id', ProductController.getById);
    routes.post('/products', ProductController.create);

export default routes;
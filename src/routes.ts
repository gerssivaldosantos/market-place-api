import { Router } from "express";

/* basic router for hello world */

const routes = Router();

routes.get('/', (req, res) => {res.send("Hello World!");});

export default routes;
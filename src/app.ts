import 'reflect-metadata';
import express from "express";
import routes from "./routes";
import "./database/connection";
import cors from "cors";
import { Express } from 'express-serve-static-core';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger.json';
class MyApp {
    app:Express;
    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
        this.app.use(process.env.SULFIX_URL, routes)
    }
}

export default new MyApp().app;
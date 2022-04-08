import 'reflect-metadata';
import express from "express";
import routes from "./routes";
import "./database/connection";
import cors from "cors";
import { Express } from 'express-serve-static-core';

class MyApp {
    app:Express;
    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use("/api/v1", routes)
    }
}

export default new MyApp().app;
import 'reflect-metadata';
import express from "express";
import routes from "./routes";
import "./database/connection";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());
app.use(routes)

app.listen(process.env.PORT || 8085, () => console.log("Server started on port 8085"));
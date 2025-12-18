import "dotenv/config";
import express from "express";
import { router } from "./routes";
import { ErrorProcessing } from "./repositories/implementations/ErrorRepository";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(router); // arquivo com as rotas

app.use(ErrorProcessing); // middleware de erro

export { app };

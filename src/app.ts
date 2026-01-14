import "dotenv/config";
import express, { Request, Response } from "express";
import { router } from "./routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ErrorProcessing } from "./repositories/implementations/ErrorRepository";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.URL_CLIENT,
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(router);

app.use(ErrorProcessing);

export { app };
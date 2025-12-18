"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const ErrorRepository_1 = require("./repositories/implementations/ErrorRepository");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(routes_1.router); // arquivo com as rotas
app.use(ErrorRepository_1.ErrorProcessing); // middleware de erro

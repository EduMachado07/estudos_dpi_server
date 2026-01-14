"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserController = void 0;
// import { MockUserRepository } from "../../../repositories/implementations/MockUserRepository";
const PostgresUserRepository_1 = require("../../../repositories/implementations/PostgresUserRepository");
const TokenRepository_1 = require("../../../repositories/implementations/TokenRepository");
const LoginUser_Controller_1 = require("./LoginUser_Controller");
const LoginUser_UseCase_1 = require("./LoginUser_UseCase");
// Configura e injeta dependências para o módulo.
// Facilita testes e mantém a arquitetura limpa.
// Instancia Repositories
const registerUserRepository = new PostgresUserRepository_1.PostgresUserRepository();
const tokenRepository = new TokenRepository_1.TokensRepository();
// Instancia Use Case
const loginUserUseCase = new LoginUser_UseCase_1.LoginUserUseCase(registerUserRepository, tokenRepository);
// Instancia Controller
const loginUserController = new LoginUser_Controller_1.LoginUserController(loginUserUseCase);
exports.loginUserController = loginUserController;

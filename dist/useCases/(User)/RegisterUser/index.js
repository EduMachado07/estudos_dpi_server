"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserController = void 0;
// import { MockUserRepository } from "../../../repositories/implementations/MockUserRepository";
const PostgresUserRepository_1 = require("../../../repositories/implementations/PostgresUserRepository");
const RegisterUser_Controller_1 = require("./RegisterUser_Controller");
const Register_UseCase_1 = require("./Register_UseCase");
// Configura e injeta dependências para o módulo.
// Facilita testes e mantém a arquitetura limpa.
// Instancia Repositories
const registerUserRepository = new PostgresUserRepository_1.PostgresUserRepository();
// Instancia Use Case
const registerUserUseCase = new Register_UseCase_1.RegisterUserUseCase(registerUserRepository);
// Instancia Controller
const registerUserController = new RegisterUser_Controller_1.RegisterUserController(registerUserUseCase);
exports.registerUserController = registerUserController;

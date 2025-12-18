// import { MockUserRepository } from "../../../repositories/implementations/MockUserRepository";
import { PostgresUserRepository } from "../../../repositories/implementations/PostgresUserRepository";
import { TokensRepository } from "../../../repositories/implementations/TokenRepository";
import { LoginUserController } from "./LoginUser_Controller";
import { LoginUserUseCase } from "./LoginUser_UseCase";
// Configura e injeta dependências para o módulo.
// Facilita testes e mantém a arquitetura limpa.

// Instancia Repositories
const registerUserRepository = new PostgresUserRepository();
const tokenRepository = new TokensRepository();

// Instancia Use Case
const loginUserUseCase = new LoginUserUseCase(registerUserRepository, tokenRepository);
// Instancia Controller
const loginUserController = new LoginUserController(loginUserUseCase);

export { loginUserController };

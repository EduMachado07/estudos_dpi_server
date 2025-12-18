"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserUseCase = void 0;
const IErrorRepository_1 = require("../../../repositories/IErrorRepository");
const bcrypt_1 = __importDefault(require("bcrypt"));
class LoginUserUseCase {
    userRepository;
    tokenRepository;
    constructor(userRepository, tokenRepository) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
    }
    async execute(data) {
        const userAlreadyExists = await this.userRepository.FindUserByEmail(data.email);
        if (!userAlreadyExists) {
            throw new IErrorRepository_1.NotFound("Ops! Usuário não encontrado em nosso sistema");
        }
        const isPasswordValid = await bcrypt_1.default.compare(data.password, userAlreadyExists.password);
        if (!isPasswordValid) {
            throw new IErrorRepository_1.Unauthorized("Senha inválida");
        }
        const accessToken = await this.tokenRepository.signAccess({
            id: userAlreadyExists.id,
            name: userAlreadyExists.name,
            // email: userAlreadyExists.email,
            role: userAlreadyExists.role,
        });
        const refreshToken = await this.tokenRepository.signRefresh({
            id: userAlreadyExists.id,
            name: userAlreadyExists.name,
            // email: userAlreadyExists.email,
            role: userAlreadyExists.role,
        });
        return {
            accessToken,
            refreshToken,
            author: { name: userAlreadyExists.name, role: userAlreadyExists.role },
        };
    }
}
exports.LoginUserUseCase = LoginUserUseCase;

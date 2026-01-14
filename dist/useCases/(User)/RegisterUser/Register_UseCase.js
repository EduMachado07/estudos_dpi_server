"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserUseCase = void 0;
const User_1 = require("../../../entities/User");
const client_1 = require("@prisma/client");
const IErrorRepository_1 = require("../../../repositories/IErrorRepository");
const bcrypt_1 = __importDefault(require("bcrypt"));
class RegisterUserUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(data) {
        const userAlreadyExists = await this.userRepository.FindUserByEmail(data.email);
        if (userAlreadyExists) {
            throw new IErrorRepository_1.Conflict("Ops! Usuário já cadastrado no nosso sistema");
        }
        const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
        const newUser = new User_1.User({
            ...data,
            password: hashedPassword,
            role: data.role ?? client_1.Role.READER,
        });
        return await this.userRepository.Register(newUser);
    }
}
exports.RegisterUserUseCase = RegisterUserUseCase;

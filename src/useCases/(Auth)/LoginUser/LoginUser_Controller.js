"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserController = void 0;
const zod_1 = __importDefault(require("zod"));
const IErrorRepository_1 = require("../../../repositories/IErrorRepository");
const LoginUserDTO_1 = require("./LoginUserDTO");
class LoginUserController {
    loginUserUseCase;
    constructor(loginUserUseCase) {
        this.loginUserUseCase = loginUserUseCase;
    }
    async handle(req, res, next) {
        try {
            const data = LoginUserDTO_1.LoginUserSchema.parse(req.body);
            const user = await this.loginUserUseCase.execute(data);
            res.cookie("accessToken", user.accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 1000 * 60 * 15, // 15 minutos
            });
            res.cookie("refreshToken", user.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
            });
            return res.status(200).json({ message: 'Usuário entrou no sistema.', author: user.author });
        }
        catch (err) {
            if (err instanceof zod_1.default.ZodError) {
                const zodValidationError = new IErrorRepository_1.ZodValidationError(err);
                return next(zodValidationError);
            }
            next(err);
        }
    }
}
exports.LoginUserController = LoginUserController;

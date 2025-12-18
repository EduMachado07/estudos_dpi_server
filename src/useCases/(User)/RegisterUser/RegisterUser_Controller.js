"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserController = void 0;
const IErrorRepository_1 = require("../../../repositories/IErrorRepository");
const Register_DTO_1 = require("./Register_DTO");
const zod_1 = require("zod");
class RegisterUserController {
    registerUserUseCase;
    constructor(registerUserUseCase) {
        this.registerUserUseCase = registerUserUseCase;
    }
    async handle(req, res, next) {
        try {
            const data = Register_DTO_1.registerUserSchema.parse(req.body);
            await this.registerUserUseCase.execute(data);
            return res.status(201).json({ message: "Usuário criado." });
        }
        catch (err) {
            if (err instanceof zod_1.z.ZodError) {
                const zodValidationError = new IErrorRepository_1.ZodValidationError(err);
                return next(zodValidationError);
            }
            next(err);
        }
    }
}
exports.RegisterUserController = RegisterUserController;

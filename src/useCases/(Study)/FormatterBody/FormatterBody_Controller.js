"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatterBodyController = void 0;
const IErrorRepository_1 = require("../../../repositories/IErrorRepository");
const zod_1 = __importDefault(require("zod"));
const FormatterBody_DTO_1 = require("./FormatterBody_DTO");
class FormatterBodyController {
    formatterBodyUseCase;
    constructor(formatterBodyUseCase) {
        this.formatterBodyUseCase = formatterBodyUseCase;
    }
    async handle(req, res, next) {
        try {
            const { content } = FormatterBody_DTO_1.FormatterBodySchema.parse(req.body);
            const formattedContent = await this.formatterBodyUseCase.execute(content);
            return res.status(200).json({
                message: "Body formatado com sucesso.",
                formattedContent: formattedContent,
            });
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
exports.FormatterBodyController = FormatterBodyController;

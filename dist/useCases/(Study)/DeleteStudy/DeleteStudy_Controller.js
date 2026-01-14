"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteStudyController = void 0;
const zod_1 = __importDefault(require("zod"));
const IErrorRepository_1 = require("../../../repositories/IErrorRepository");
const DeleteStudy_DTO_1 = require("./DeleteStudy_DTO");
class DeleteStudyController {
    deleteStudyUseCase;
    constructor(deleteStudyUseCase) {
        this.deleteStudyUseCase = deleteStudyUseCase;
    }
    async handle(req, res, next) {
        try {
            const data = DeleteStudy_DTO_1.deleteStudySchema.parse({
                id: req.params.id,
                authorId: req.authorId,
            });
            await this.deleteStudyUseCase.execute(data);
            return res
                .status(200)
                .json({ message: "Estudo retirado do sistema com sucesso." });
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
exports.DeleteStudyController = DeleteStudyController;

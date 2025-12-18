"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStudyController = void 0;
const zod_1 = __importDefault(require("zod"));
const IErrorRepository_1 = require("../../../repositories/IErrorRepository");
const UpdateStudy_DTO_1 = require("./UpdateStudy_DTO");
class UpdateStudyController {
    updateStudyUseCase;
    constructor(updateStudyUseCase) {
        this.updateStudyUseCase = updateStudyUseCase;
    }
    async handle(req, res, next) {
        try {
            // console.log("UpdateStudyController: ", req.body);
            const data = UpdateStudy_DTO_1.UpdateStudySchema.parse({
                studyId: req.params.id,
                authorId: req.authorId,
                ...req.body,
            });
            const thumbnail = req.file?.buffer;
            const studyUpdated = await this.updateStudyUseCase.execute(data, thumbnail);
            return res
                .status(200)
                .json({ message: "Estudo alterado com sucesso.", studyUpdated });
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
exports.UpdateStudyController = UpdateStudyController;

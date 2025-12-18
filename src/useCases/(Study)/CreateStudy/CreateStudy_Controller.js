"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStudyController = void 0;
const zod_1 = __importDefault(require("zod"));
const IErrorRepository_1 = require("../../../repositories/IErrorRepository");
const CreateStudy_DTO_1 = require("./CreateStudy_DTO");
class CreateStudyController {
    createStudyUseCase;
    constructor(createStudyUseCase) {
        this.createStudyUseCase = createStudyUseCase;
    }
    async handle(req, res, next) {
        try {
            const data = CreateStudy_DTO_1.CreateStudySchema.parse({
                ...req.body,
                authorId: req.authorId,
            });
            const thumbnail = req.file?.buffer;
            if (!thumbnail) {
                throw new IErrorRepository_1.BadRequest("Thumbnail não informada");
            }
            const study = await this.createStudyUseCase.execute(data, thumbnail);
            return res
                .status(201)
                .json({ message: "Estudo criado com sucesso.", estudo: study });
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
exports.CreateStudyController = CreateStudyController;

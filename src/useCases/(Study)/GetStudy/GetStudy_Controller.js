"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetStudyBySlugController = exports.GetStudyController = void 0;
const zod_1 = __importDefault(require("zod"));
const IErrorRepository_1 = require("../../../repositories/IErrorRepository");
const GetStudy_DTO_1 = require("./GetStudy_DTO");
class GetStudyController {
    getStudyUseCase;
    constructor(getStudyUseCase) {
        this.getStudyUseCase = getStudyUseCase;
    }
    async handle(req, res, next) {
        try {
            const data = GetStudy_DTO_1.getStudiesSchema.parse(req.query);
            const studies = await this.getStudyUseCase.execute(data);
            return res
                .status(200)
                .json({ message: "Estudos retornados com sucesso.", studies });
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
exports.GetStudyController = GetStudyController;
class GetStudyBySlugController {
    getStudyBySlugUseCase;
    constructor(getStudyBySlugUseCase) {
        this.getStudyBySlugUseCase = getStudyBySlugUseCase;
    }
    async handle(req, res, next) {
        try {
            const { user, slug } = req.params;
            const data = `${user}/${slug}`;
            const study = await this.getStudyBySlugUseCase.execute(data);
            return res
                .status(200)
                .json({ message: "Estudo retornado com sucesso.", study });
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
exports.GetStudyBySlugController = GetStudyBySlugController;

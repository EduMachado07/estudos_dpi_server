"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetStudiesAuthorController = void 0;
const IErrorRepository_1 = require("../../../repositories/IErrorRepository");
const zod_1 = __importDefault(require("zod"));
const GetStudiesAuthor_DTO_1 = require("./GetStudiesAuthor_DTO");
class GetStudiesAuthorController {
    getStudiesAuthorUseCase;
    constructor(getStudiesAuthorUseCase) {
        this.getStudiesAuthorUseCase = getStudiesAuthorUseCase;
    }
    async handle(req, res, next) {
        try {
            const data = GetStudiesAuthor_DTO_1.GetStudiesAuthorSchema.parse({
                ...req.body,
                authorId: req.authorId,
                authorRole: req.role,
                authorName: req.name,
            });
            const studies = await this.getStudiesAuthorUseCase.execute(data);
            return res
                .status(200)
                .json({ message: "Estudos buscados com sucesso.", studies });
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
exports.GetStudiesAuthorController = GetStudiesAuthorController;

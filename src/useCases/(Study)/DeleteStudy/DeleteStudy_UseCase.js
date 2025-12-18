"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteStudyUseCase = void 0;
const IErrorRepository_1 = require("../../../repositories/IErrorRepository");
class DeleteStudyUseCase {
    studiesRepository;
    uploadThumbnail;
    constructor(studiesRepository, uploadThumbnail) {
        this.studiesRepository = studiesRepository;
        this.uploadThumbnail = uploadThumbnail;
    }
    async execute(data) {
        const studyExists = await this.studiesRepository.findById(data.id);
        if (!studyExists) {
            throw new IErrorRepository_1.NotFound("Estudo não encontrado no sistema");
        }
        if (studyExists.authorId !== data.authorId) {
            throw new IErrorRepository_1.Unauthorized("Você não tem permissão para excluir este estudo");
        }
        await this.uploadThumbnail.destroy(studyExists.thumbnailId);
        await this.studiesRepository.deleteById(data.id);
        return;
    }
}
exports.DeleteStudyUseCase = DeleteStudyUseCase;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStudyUseCase = void 0;
const IErrorRepository_1 = require("../../../repositories/IErrorRepository");
class UpdateStudyUseCase {
    userRepository;
    studyRepository;
    uploadThumbnail;
    constructor(userRepository, studyRepository, uploadThumbnail) {
        this.userRepository = userRepository;
        this.studyRepository = studyRepository;
        this.uploadThumbnail = uploadThumbnail;
    }
    async execute(data, thumbnail) {
        const studyExists = await this.studyRepository.findById(data.studyId);
        if (!studyExists) {
            throw new IErrorRepository_1.NotFound("Estudo não encontrado no sistema");
        }
        if (studyExists.authorId !== data.authorId) {
            throw new IErrorRepository_1.Unauthorized("Você não tem permissão para alterar este estudo");
        }
        const author = await this.userRepository.FindUserById(data.authorId);
        if (!author) {
            throw new IErrorRepository_1.NotFound("Autor não encontrado no sistema");
        }
        let newSlug;
        if (data.title) {
            newSlug = await this.studyRepository.createSlug(author.name, data.title);
        }
        let thumbnailId = studyExists.thumbnailId;
        let thumbnailUrl = studyExists.thumbnailUrl;
        if (thumbnail) {
            if (thumbnailId) {
                await this.uploadThumbnail.destroy(thumbnailId);
            }
            const uploadResult = await this.uploadThumbnail.uploadStream(thumbnail, thumbnailId);
            thumbnailId = uploadResult.id;
            thumbnailUrl = uploadResult.url;
        }
        const { authorId, studyId, ...rest } = data;
        const dataStudy = {
            ...rest,
            ...(newSlug && { slug: newSlug }),
            id: studyId,
            thumbnailId,
            thumbnailUrl,
        };
        const studyUpdated = await this.studyRepository.updateById(data.studyId, dataStudy);
        return studyUpdated;
    }
}
exports.UpdateStudyUseCase = UpdateStudyUseCase;

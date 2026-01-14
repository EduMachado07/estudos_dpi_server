"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStudyUseCase = void 0;
const IErrorRepository_1 = require("../../../repositories/IErrorRepository");
class UpdateStudyUseCase {
    userRepository;
    studyRepository;
    uploadThumbnail;
    uploadVideo;
    constructor(userRepository, studyRepository, uploadThumbnail, uploadVideo) {
        this.userRepository = userRepository;
        this.studyRepository = studyRepository;
        this.uploadThumbnail = uploadThumbnail;
        this.uploadVideo = uploadVideo;
    }
    async execute(data, thumbnail, video) {
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
        // update thumbnail if provided
        let thumbnailId = studyExists.thumbnailId;
        let thumbnailUrl = studyExists.thumbnailUrl;
        if (thumbnail) {
            if (thumbnailId) {
                await this.uploadThumbnail.destroy(thumbnailId, "image");
            }
            const uploadResult = await this.uploadThumbnail.uploadStream(thumbnail, {
                resourceType: "image",
            });
            thumbnailId = uploadResult.id;
            thumbnailUrl = uploadResult.url;
        }
        // update video
        let videoId = studyExists.videoId;
        let videoUrl = studyExists.videoUrl;
        // REMOVER VÍDEO
        if (data.removeVideo) {
            if (videoId) {
                await this.uploadVideo.destroy(videoId, "video");
            }
            videoId = null;
            videoUrl = null;
        }
        // SUBSTITUIR / ADICIONAR VÍDEO
        if (video && !data.removeVideo) {
            if (videoId) {
                await this.uploadVideo.destroy(videoId, "video");
            }
            const uploadResult = await this.uploadVideo.uploadStream(video, {
                resourceType: "video",
            });
            videoId = uploadResult.id;
            videoUrl = uploadResult.url;
        }
        // update study
        const { authorId, studyId, removeVideo, ...rest } = data;
        const dataStudy = {
            ...rest,
            ...(newSlug && { slug: newSlug }),
            id: studyId,
            thumbnailId,
            thumbnailUrl,
            videoId,
            videoUrl,
        };
        const studyUpdated = await this.studyRepository.updateById(data.studyId, dataStudy);
        return studyUpdated;
    }
}
exports.UpdateStudyUseCase = UpdateStudyUseCase;

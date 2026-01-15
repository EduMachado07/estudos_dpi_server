"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStudyUseCase = void 0;
const Study_1 = require("../../../entities/Study");
const IErrorRepository_1 = require("../../../repositories/IErrorRepository");
class CreateStudyUseCase {
    studyRepository;
    userRepository;
    uploadThumbnail;
    uploadVideo;
    constructor(studyRepository, userRepository, uploadThumbnail, uploadVideo) {
        this.studyRepository = studyRepository;
        this.userRepository = userRepository;
        this.uploadThumbnail = uploadThumbnail;
        this.uploadVideo = uploadVideo;
    }
    async execute(data, thumbnail, video) {
        const userAlreadyExists = await this.userRepository.FindUserById(data.authorId);
        if (!userAlreadyExists) {
            throw new IErrorRepository_1.NotFound("Ops! Autor não encontrado em nosso sistema");
        }
        const slug = await this.studyRepository.createSlug(userAlreadyExists.name, data.title);
        const readingTime = await this.studyRepository.setReadingTime(data.body);
        const newThumbnail = await this.uploadThumbnail.uploadStream(thumbnail, {
            resourceType: "image",
            folder: "studies_thumbmnails",
        });
        const newVideo = video
            ? await this.uploadVideo.uploadStream(video, {
                resourceType: "video",
                folder: "studies_videos",
            })
            : null;
        const { authorId, ...rest } = data;
        const study = new Study_1.Study({
            ...rest,
            slug,
            readingTime,
            authorId: userAlreadyExists.id,
            // authorName: userAlreadyExists.name,
            thumbnailUrl: newThumbnail.url,
            thumbnailId: newThumbnail.id,
            videoUrl: newVideo?.url ?? null,
            videoId: newVideo?.id ?? null,
        });
        const newStudy = await this.studyRepository.create(study);
        return newStudy;
    }
}
exports.CreateStudyUseCase = CreateStudyUseCase;

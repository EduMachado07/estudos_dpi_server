"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetStudyBySlugUseCase = exports.GetStudyUseCase = void 0;
class GetStudyUseCase {
    studyRepository;
    constructor(studyRepository) {
        this.studyRepository = studyRepository;
    }
    async execute(data) {
        const { studies, length } = await this.studyRepository.findStudies(data.offset, data.limit);
        const currentOffset = Math.min(data.offset, Math.max(0, length - 1));
        const nextOffset = currentOffset + data.limit;
        const prevOffset = Math.max(0, currentOffset - data.limit);
        return {
            ...data,
            length,
            data: studies,
            next: nextOffset < length ? nextOffset : null,
            previous: currentOffset > 0 ? prevOffset : null,
        };
    }
}
exports.GetStudyUseCase = GetStudyUseCase;
class GetStudyBySlugUseCase {
    studyRepository;
    constructor(studyRepository) {
        this.studyRepository = studyRepository;
    }
    async execute(slug) {
        const study = await this.studyRepository.findBySlug(slug);
        return study;
    }
}
exports.GetStudyBySlugUseCase = GetStudyBySlugUseCase;

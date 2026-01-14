"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetStudiesAuthorUseCase = void 0;
class GetStudiesAuthorUseCase {
    studiesRepository;
    constructor(studiesRepository) {
        this.studiesRepository = studiesRepository;
    }
    async execute(data) {
        const { studies, length } = await this.studiesRepository.findStudiesByAuthorId(data.authorId, data.offset, data.limit);
        // Garante que offset não ultrapasse o tamanho total
        const currentOffset = Math.min(data.offset, Math.max(0, length));
        const nextOffset = currentOffset + data.limit < length ? currentOffset + data.limit : null;
        const prevOffset = currentOffset - data.limit >= 0 ? currentOffset - data.limit : null;
        const author = {
            name: data.authorName,
            role: data.authorRole,
        };
        return {
            offset: currentOffset,
            limit: data.limit,
            author,
            total: length,
            data: studies,
            next: nextOffset,
            previous: prevOffset,
        };
    }
}
exports.GetStudiesAuthorUseCase = GetStudiesAuthorUseCase;

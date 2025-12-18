import { IStudyRepository } from "../../../repositories/IStudyRepository";
import { ITokenRepository } from "../../../repositories/ITokenRepository";
import { IGetStudiesAuthorDTO } from "./GetStudiesAuthor_DTO";

export class GetStudiesAuthorUseCase {
  constructor(private studiesRepository: IStudyRepository) {}

  async execute(data: IGetStudiesAuthorDTO) {
    const { studies, length } =
      await this.studiesRepository.findStudiesByAuthorId(
        data.authorId,
        data.offset,
        data.limit
      );

    // Garante que offset não ultrapasse o tamanho total
    const currentOffset = Math.min(data.offset, Math.max(0, length));

    const nextOffset =
      currentOffset + data.limit < length ? currentOffset + data.limit : null;
    const prevOffset =
      currentOffset - data.limit >= 0 ? currentOffset - data.limit : null;

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

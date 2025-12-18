import { Study } from "../../../entities/Study";
import { IStudyRepository } from "../../../repositories/IStudyRepository";
import { IGetStudiesDTO } from "./GetStudy_DTO";

export class GetStudyUseCase {
  constructor(private studyRepository: IStudyRepository) {}

  async execute(data: IGetStudiesDTO): Promise<Object> {
    const { studies, length } = await this.studyRepository.findStudies(
      data.offset,
      data.limit
    );

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

export class GetStudyBySlugUseCase {
  constructor(private studyRepository: IStudyRepository) {}

  async execute(slug: string): Promise<Study | null> {
    const study = await this.studyRepository.findBySlug(slug);

    return study;
  }
}

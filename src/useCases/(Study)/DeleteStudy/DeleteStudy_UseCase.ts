import { IUploadImage } from "../../../providers/IUploadImage";
import { NotFound, Unauthorized } from "../../../repositories/IErrorRepository";
import { IStudyRepository } from "../../../repositories/IStudyRepository";
import { IDeleteStudyDTO } from "./DeleteStudy_DTO";

export class DeleteStudyUseCase {
  constructor(
    private studiesRepository: IStudyRepository,
    private uploadThumbnail: IUploadImage
  ) {}

  async execute(data: IDeleteStudyDTO): Promise<void> {
    const studyExists = await this.studiesRepository.findById(data.id);
    if (!studyExists) {
      throw new NotFound("Estudo não encontrado no sistema");
    }

    if (studyExists.authorId !== data.authorId) {
      throw new Unauthorized("Você não tem permissão para excluir este estudo");
    }
    await this.uploadThumbnail.destroy(studyExists.thumbnailId);
    await this.studiesRepository.deleteById(data.id);

    return;
  }
}

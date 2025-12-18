import { Study } from "../../../entities/Study";
import { IUploadImage } from "../../../providers/IUploadImage";
import { NotFound, Unauthorized } from "../../../repositories/IErrorRepository";
import { IStudyRepository } from "../../../repositories/IStudyRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { IUpdateStudyDTO } from "./UpdateStudy_DTO";

export class UpdateStudyUseCase {
  constructor(
    private userRepository: IUserRepository,
    private studyRepository: IStudyRepository,
    private uploadThumbnail: IUploadImage
  ) {}

  async execute(data: IUpdateStudyDTO, thumbnail?: Buffer): Promise<Study> {
    const studyExists = await this.studyRepository.findById(data.studyId);
    if (!studyExists) {
      throw new NotFound("Estudo não encontrado no sistema");
    }

    if (studyExists.authorId !== data.authorId) {
      throw new Unauthorized("Você não tem permissão para alterar este estudo");
    }

    const author = await this.userRepository.FindUserById(data.authorId);
    if (!author) {
      throw new NotFound("Autor não encontrado no sistema");
    }

    let newSlug: string | undefined;

    if (data.title) {
      newSlug = await this.studyRepository.createSlug(author.name, data.title);
    }

    let thumbnailId = studyExists.thumbnailId;
    let thumbnailUrl = studyExists.thumbnailUrl;

    if (thumbnail) {
      if (thumbnailId) {
        await this.uploadThumbnail.destroy(thumbnailId);
      }

      const uploadResult = await this.uploadThumbnail.uploadStream(
        thumbnail,
        thumbnailId
      );

      thumbnailId = uploadResult.id;
      thumbnailUrl = uploadResult.url;
    }

    const { authorId, studyId, ...rest } = data;
    const dataStudy: Partial<Study> = {
      ...rest,
      ...(newSlug && { slug: newSlug }),
      id: studyId,
      thumbnailId,
      thumbnailUrl,
    };

    const studyUpdated = await this.studyRepository.updateById(
      data.studyId,
      dataStudy
    );

    return studyUpdated;
  }
}

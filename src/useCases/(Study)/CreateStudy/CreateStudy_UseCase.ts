import { Study } from "../../../entities/Study";
import { CloudinaryProvider } from "../../../providers/implementations/CloudinaryUploadImageProvider";
import { NotFound } from "../../../repositories/IErrorRepository";
import { IStudyRepository } from "../../../repositories/IStudyRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { ICreateStudyDTO } from "./CreateStudy_DTO";

export class CreateStudyUseCase {
  constructor(
    private studyRepository: IStudyRepository,
    private userRepository: IUserRepository,
    private uploadThumbnail: CloudinaryProvider
  ) {}

  async execute(data: ICreateStudyDTO, thumbnail: Buffer): Promise<Study> {
    const userAlreadyExists = await this.userRepository.FindUserById(
      data.authorId
    );

    if (!userAlreadyExists) {
      throw new NotFound("Ops! Autor não encontrado em nosso sistema");
    }

    const slug = await this.studyRepository.createSlug(
      userAlreadyExists.name,
      data.title
    );

    const readingTime = await this.studyRepository.setReadingTime(data.body)

    const newThumbnail = await this.uploadThumbnail.uploadStream(thumbnail);

    const { authorId, ...rest } = data;
    const study = new Study({
      ...rest,
      slug,
      readingTime,
      authorId: userAlreadyExists.id,
      // authorName: userAlreadyExists.name,
      thumbnailUrl: newThumbnail.url,
      thumbnailId: newThumbnail.id,
    });

    const newStudy = await this.studyRepository.create(study);

    return newStudy;
  }
}

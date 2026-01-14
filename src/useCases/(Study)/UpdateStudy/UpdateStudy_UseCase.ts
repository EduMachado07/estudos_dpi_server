import { Study } from "../../../entities/Study";
import { IUploadFile } from "../../../providers/IUploadFile";
import { NotFound, Unauthorized } from "../../../repositories/IErrorRepository";
import { IStudyRepository } from "../../../repositories/IStudyRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { IUpdateStudyDTO } from "./UpdateStudy_DTO";

export class UpdateStudyUseCase {
  constructor(
    private userRepository: IUserRepository,
    private studyRepository: IStudyRepository,
    private uploadThumbnail: IUploadFile,
    private uploadVideo: IUploadFile
  ) {}

  async execute(
    data: IUpdateStudyDTO,
    thumbnail?: Buffer,
    video?: Buffer
  ): Promise<Study> {
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
    const dataStudy: Partial<Study> = {
      ...rest,
      ...(newSlug && { slug: newSlug }),
      id: studyId,
      thumbnailId,
      thumbnailUrl,
      videoId,
      videoUrl,
    };

    const studyUpdated = await this.studyRepository.updateById(
      data.studyId,
      dataStudy
    );

    return studyUpdated;
  }
}

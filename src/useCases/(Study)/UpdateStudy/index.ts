import { CloudinaryProvider } from "../../../providers/implementations/CloudinaryUploadFileProvider";
import { PostgresStudyRepository } from "../../../repositories/implementations/PostgresStudyRepository";
import { PostgresUserRepository } from "../../../repositories/implementations/PostgresUserRepository";
import { UpdateStudyController } from "./UpdateStudy_Controller";
import { UpdateStudyUseCase } from "./UpdateStudy_UseCase";

const userRepository = new PostgresUserRepository();
const studyRepository = new PostgresStudyRepository();
const uploadThumbnail = new CloudinaryProvider();
const uploadVideo = new CloudinaryProvider();

const updateStudyUseCase = new UpdateStudyUseCase(
  userRepository,
  studyRepository,
  uploadThumbnail,
  uploadVideo
);

const updateStudyController = new UpdateStudyController(updateStudyUseCase);

export { updateStudyController };

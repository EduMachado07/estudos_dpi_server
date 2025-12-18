import { DeleteStudyController } from "./DeleteStudy_Controller";
import { DeleteStudyUseCase } from "./DeleteStudy_UseCase";
import { CloudinaryProvider } from "../../../providers/implementations/CloudinaryUploadImageProvider";
import { PostgresStudyRepository } from "../../../repositories/implementations/PostgresStudyRepository";


const mockStudyRepository = new PostgresStudyRepository();
const uploadThumbnail = new CloudinaryProvider();

const deleteStudyUseCase = new DeleteStudyUseCase(mockStudyRepository, uploadThumbnail);

const deleteStudyController = new DeleteStudyController(deleteStudyUseCase);

export { deleteStudyController };
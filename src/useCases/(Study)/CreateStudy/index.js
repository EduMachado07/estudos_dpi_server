"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStudyController = void 0;
// import { MockStudyRepository } from "../../../repositories/implementations/MockStudyRepository";
// import { MockUserRepository } from "../../../repositories/implementations/MockUserRepository";
const CreateStudy_Controller_1 = require("./CreateStudy_Controller");
const CreateStudy_UseCase_1 = require("./CreateStudy_UseCase");
const CloudinaryUploadFileProvider_1 = require("../../../providers/implementations/CloudinaryUploadFileProvider");
const PostgresUserRepository_1 = require("../../../repositories/implementations/PostgresUserRepository");
const PostgresStudyRepository_1 = require("../../../repositories/implementations/PostgresStudyRepository");
// Configura e injeta dependências para o módulo.
// Facilita testes e mantém a arquitetura limpa.
// Instancia Repositories
const userRepository = new PostgresUserRepository_1.PostgresUserRepository();
const studyRepository = new PostgresStudyRepository_1.PostgresStudyRepository();
const uploadThumbnail = new CloudinaryUploadFileProvider_1.CloudinaryProvider();
const uploadVideo = new CloudinaryUploadFileProvider_1.CloudinaryProvider();
// Instancia Use Case
const createStudyUseCase = new CreateStudy_UseCase_1.CreateStudyUseCase(studyRepository, userRepository, uploadThumbnail, uploadVideo);
// Instancia Controller
const createStudyController = new CreateStudy_Controller_1.CreateStudyController(createStudyUseCase);
exports.createStudyController = createStudyController;

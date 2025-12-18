import { Study } from '../../../entities/Study';
import { PostgresStudyRepository } from '../../../repositories/implementations/PostgresStudyRepository';
import { GetStudiesAuthorController } from './GetStudiesAuthor_Controller';
import { GetStudiesAuthorUseCase } from './GetStudiesAuthor_UseCase';

const studiesRepository = new PostgresStudyRepository();

const getStudiesAuthorUseCase = new GetStudiesAuthorUseCase(
  studiesRepository,
);

const getStudiesAuthorController = new GetStudiesAuthorController(
  getStudiesAuthorUseCase,
);

export { getStudiesAuthorController };
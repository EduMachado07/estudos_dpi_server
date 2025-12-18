import z from "zod";
import { ZodValidationError } from "../../../repositories/IErrorRepository";
import { NextFunction, Request, Response } from "express";
import { GetStudyBySlugUseCase, GetStudyUseCase } from "./GetStudy_UseCase";
import { getStudiesSchema } from "./GetStudy_DTO";

export class GetStudyController {
  constructor(private getStudyUseCase: GetStudyUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const data = getStudiesSchema.parse(req.query);

      const studies = await this.getStudyUseCase.execute(data);

      return res
        .status(200)
        .json({ message: "Estudos retornados com sucesso.", studies });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const zodValidationError = new ZodValidationError(err);
        return next(zodValidationError);
      }
      next(err);
    }
  }
}
export class GetStudyBySlugController {
  constructor(private getStudyBySlugUseCase: GetStudyBySlugUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { user, slug } = req.params;

      const data = `${user}/${slug}`

      const study = await this.getStudyBySlugUseCase.execute(data);

      return res
        .status(200)
        .json({ message: "Estudo retornado com sucesso.", study });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const zodValidationError = new ZodValidationError(err);
        return next(zodValidationError);
      }
      next(err);
    }
  }
}

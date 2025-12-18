import { ZodValidationError } from "../../../repositories/IErrorRepository";
import z from "zod";
import { NextFunction, Response } from "express";
import { IAuthAuthor } from "../../(Auth)/AuthAuthor/AuthAuthor_DTO";
import { GetStudiesAuthorSchema } from "./GetStudiesAuthor_DTO";
import { GetStudiesAuthorUseCase } from "./GetStudiesAuthor_UseCase";

export class GetStudiesAuthorController {
  constructor(private getStudiesAuthorUseCase: GetStudiesAuthorUseCase) {}

  async handle(req: IAuthAuthor, res: Response, next: NextFunction) {
    try {
      const data = GetStudiesAuthorSchema.parse({
        ...req.body,
        authorId: req.authorId,
        authorRole: req.role,
        authorName: req.name,
      });

      const studies = await this.getStudiesAuthorUseCase.execute(data);

      return res
        .status(200)
        .json({ message: "Estudos buscados com sucesso.", studies });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const zodValidationError = new ZodValidationError(err);
        return next(zodValidationError);
      }
      next(err);
    }
  }
}

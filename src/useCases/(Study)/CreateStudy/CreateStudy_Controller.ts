import z from "zod";
import {
  BadRequest,
  ZodValidationError,
} from "../../../repositories/IErrorRepository";
import { NextFunction, Response } from "express";
import { CreateStudySchema } from "./CreateStudy_DTO";
import { CreateStudyUseCase } from "./CreateStudy_UseCase";
import { IAuthAuthor } from "../../(Auth)/AuthAuthor/AuthAuthor_DTO";

export class CreateStudyController {
  constructor(private createStudyUseCase: CreateStudyUseCase) {}

  async handle(req: IAuthAuthor, res: Response, next: NextFunction) {
    try {
      const data = CreateStudySchema.parse({
        ...req.body,
        authorId: req.authorId,
      });
      const thumbnail = req.file?.buffer;

      if (!thumbnail) {
        throw new BadRequest("Thumbnail não informada");
      }

      const study = await this.createStudyUseCase.execute(data, thumbnail);

      return res
        .status(201)
        .json({ message: "Estudo criado com sucesso.", estudo: study });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const zodValidationError = new ZodValidationError(err);
        return next(zodValidationError);
      }
      next(err);
    }
  }
}

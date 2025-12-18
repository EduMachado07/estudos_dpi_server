import z from "zod";
import { ZodValidationError } from "../../../repositories/IErrorRepository";
import { NextFunction, Response } from "express";
import { UpdateStudySchema } from "./UpdateStudy_DTO";
import { UpdateStudyUseCase } from "./UpdateStudy_UseCase";
import { IAuthAuthor } from "../../(Auth)/AuthAuthor/AuthAuthor_DTO";

export class UpdateStudyController {
  constructor(private updateStudyUseCase: UpdateStudyUseCase) {}

  async handle(req: IAuthAuthor, res: Response, next: NextFunction) {
    try {
      // console.log("UpdateStudyController: ", req.body);

      const data = UpdateStudySchema.parse({
        studyId: req.params.id,
        authorId: req.authorId,
        ...req.body,
      });
      const thumbnail = req.file?.buffer;

      const studyUpdated = await this.updateStudyUseCase.execute(
        data,
        thumbnail
      );

      return res
        .status(200)
        .json({ message: "Estudo alterado com sucesso.", studyUpdated });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const zodValidationError = new ZodValidationError(err);
        return next(zodValidationError);
      }
      next(err);
    }
  }
}

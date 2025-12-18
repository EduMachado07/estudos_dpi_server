import z from "zod";
import { ZodValidationError } from "../../../repositories/IErrorRepository";
import { NextFunction, Request, Response } from "express";
import { DeleteStudyUseCase } from "./DeleteStudy_UseCase";
import { deleteStudySchema } from "./DeleteStudy_DTO";
import { IAuthAuthor } from "../../(Auth)/AuthAuthor/AuthAuthor_DTO";

export class DeleteStudyController {
  constructor(private deleteStudyUseCase: DeleteStudyUseCase) {}

  async handle(req: IAuthAuthor, res: Response, next: NextFunction) {
    try {
      const data = deleteStudySchema.parse({
        id: req.params.id,
        authorId: req.authorId,
      });

      await this.deleteStudyUseCase.execute(data);

      return res
        .status(200)
        .json({ message: "Estudo retirado do sistema com sucesso." });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const zodValidationError = new ZodValidationError(err);
        return next(zodValidationError);
      }
      next(err);
    }
  }
}

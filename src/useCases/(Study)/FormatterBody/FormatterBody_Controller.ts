import { NextFunction, Request, Response } from "express";
import { FormatterBodyUseCase } from "./FormatterBody_UseCase";
import {
  BadRequest,
  ZodValidationError,
} from "../../../repositories/IErrorRepository";
import z from "zod";
import { FormatterBodySchema } from "./FormatterBody_DTO";

export class FormatterBodyController {
  constructor(private formatterBodyUseCase: FormatterBodyUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { content } = FormatterBodySchema.parse(req.body);
      
      const formattedContent = await this.formatterBodyUseCase.execute(content);

      return res.status(200).json({
        message: "Body formatado com sucesso.",
        formattedContent: formattedContent,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const zodValidationError = new ZodValidationError(err);
        return next(zodValidationError);
      }
      next(err);
    }
  }
}

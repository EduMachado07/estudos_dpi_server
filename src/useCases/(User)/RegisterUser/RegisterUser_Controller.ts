import { NextFunction, Request, Response } from "express";
import { ZodValidationError } from "../../../repositories/IErrorRepository";
import { registerUserSchema } from "./Register_DTO";
import { RegisterUserUseCase } from "./Register_UseCase";
import { z } from "zod";

export class RegisterUserController {
  constructor(private registerUserUseCase: RegisterUserUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const data = registerUserSchema.parse(req.body);

      await this.registerUserUseCase.execute(data);

      return res.status(201).json({ message: "Usuário criado." });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const zodValidationError = new ZodValidationError(err);
        return next(zodValidationError);
      }
      next(err);
    }
  }
}

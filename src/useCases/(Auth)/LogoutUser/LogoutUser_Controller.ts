import { NextFunction, Request, Response } from "express";

export class LogoutUserController {
  constructor() {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });

      return res
        .status(200)
        .json({ message: "Usuário saiu do sistema."});
    } catch (err) {
      // if (err instanceof z.ZodError) {
      //   const zodValidationError = new ZodValidationError(err);
      //   return next(zodValidationError);
      // }
      next(err);
    }
  }
}

import { NextFunction, Request, Response } from "express";
import { RefreshTokenUseCase } from "./RefreshToken_UseCase";

export class RefreshTokenController {
  constructor(private refreshTokenUseCase: RefreshTokenUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies["refreshToken"];

      if (!refreshToken) {
        return res.status(401).json({
          code: "refresh.missing",
          message: "Refresh token não encontrado",
        });
      }

      const token = await this.refreshTokenUseCase.execute(refreshToken);

      res.cookie("accessToken", token.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 1000 * 60 * 15, // 15 minutos
      });

      res.cookie("refreshToken", token.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
      });

      return res.status(200).json({ message: "Token renovado com sucesso" });
    } catch (error) {
      return res.status(401).json({
        code: "refresh.invalid",
        message: "Refresh token inválido ou expirado",
      });
    }
  }
}

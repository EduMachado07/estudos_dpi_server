"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenController = void 0;
class RefreshTokenController {
    refreshTokenUseCase;
    constructor(refreshTokenUseCase) {
        this.refreshTokenUseCase = refreshTokenUseCase;
    }
    async handle(req, res) {
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
        }
        catch (error) {
            return res.status(401).json({
                code: "refresh.invalid",
                message: "Refresh token inválido ou expirado",
            });
        }
    }
}
exports.RefreshTokenController = RefreshTokenController;

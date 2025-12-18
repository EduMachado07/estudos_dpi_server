"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutUserController = void 0;
class LogoutUserController {
    constructor() { }
    async handle(req, res, next) {
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
                .json({ message: "Usuário saiu do sistema." });
        }
        catch (err) {
            // if (err instanceof z.ZodError) {
            //   const zodValidationError = new ZodValidationError(err);
            //   return next(zodValidationError);
            // }
            next(err);
        }
    }
}
exports.LogoutUserController = LogoutUserController;

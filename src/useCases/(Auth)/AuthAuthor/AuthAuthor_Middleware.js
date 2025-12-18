"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthAuthorMiddleware = void 0;
const IErrorRepository_1 = require("../../../repositories/IErrorRepository");
// import { Token } from "../../../entities/Token";
const client_1 = require("@prisma/client");
class AuthAuthorMiddleware {
    tokenRepository;
    constructor(tokenRepository) {
        this.tokenRepository = tokenRepository;
        this.handle = this.handle.bind(this);
    }
    async handle(req, res, next) {
        try {
            const accessToken = req.cookies["accessToken"];
            if (!accessToken) {
                throw new IErrorRepository_1.Unauthorized("Acesso negado. Token não fornecido.");
            }
            const { id, role, name } = await this.tokenRepository.verifyAccess(accessToken);
            if (role === client_1.Role.READER) {
                throw new IErrorRepository_1.Unauthorized("Acesso negado. Permissão insuficiente.");
            }
            req.authorId = id;
            req.role = role;
            req.name = name;
            next();
        }
        catch (err) {
            if (err.name === "TokenExpiredError") {
                return res
                    .status(401)
                    .json({ code: "token.expired", message: "Token expirado" });
            }
            if (err.name === "JsonWebTokenError") {
                return res
                    .status(401)
                    .json({ code: "token.invalid", message: "Token inválido" });
            }
            return res
                .status(401)
                .json({ code: "token.missing", message: "Token não fornecido" });
        }
    }
}
exports.AuthAuthorMiddleware = AuthAuthorMiddleware;

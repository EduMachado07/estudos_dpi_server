"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authAuthorMiddleware = void 0;
const TokenRepository_1 = require("../../../repositories/implementations/TokenRepository");
const AuthAuthor_Middleware_1 = require("./AuthAuthor_Middleware");
const tokenRepository = new TokenRepository_1.TokensRepository();
const authAuthorMiddleware = new AuthAuthor_Middleware_1.AuthAuthorMiddleware(tokenRepository);
exports.authAuthorMiddleware = authAuthorMiddleware;

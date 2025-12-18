import { TokensRepository } from "../../../repositories/implementations/TokenRepository";
import { AuthAuthorMiddleware } from "./AuthAuthor_Middleware";

const tokenRepository = new TokensRepository()

const authAuthorMiddleware = new AuthAuthorMiddleware(tokenRepository);

export { authAuthorMiddleware };
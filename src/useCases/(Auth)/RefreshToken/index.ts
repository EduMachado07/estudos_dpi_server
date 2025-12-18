import { TokensRepository } from "../../../repositories/implementations/TokenRepository";
import { RefreshTokenController } from "./RefreshToken_Controller";
import { RefreshTokenUseCase } from "./RefreshToken_UseCase";

const tokenRepository = new TokensRepository();

const refreshTokenUseCase = new RefreshTokenUseCase(tokenRepository);
const refreshTokenController = new RefreshTokenController(refreshTokenUseCase);

export { refreshTokenController, refreshTokenUseCase };

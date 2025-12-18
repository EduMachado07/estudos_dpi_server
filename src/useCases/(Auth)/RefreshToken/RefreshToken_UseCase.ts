import { TokensRepository } from "../../../repositories/implementations/TokenRepository";
import { ITokenRepository } from "../../../repositories/ITokenRepository";

export class RefreshTokenUseCase {
  constructor(private tokenRepository: ITokenRepository) {}

  async execute(token: string) {
    const { id, name, role } = await this.tokenRepository.verifyRefresh(token);
    const accessToken = await this.tokenRepository.signAccess({
      id,
      name,
      role,
    });
    const refreshToken = await this.tokenRepository.signRefresh({
      id,
      name,
      role,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenUseCase = void 0;
class RefreshTokenUseCase {
    tokenRepository;
    constructor(tokenRepository) {
        this.tokenRepository = tokenRepository;
    }
    async execute(token) {
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
exports.RefreshTokenUseCase = RefreshTokenUseCase;

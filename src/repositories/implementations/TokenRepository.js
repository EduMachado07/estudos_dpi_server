"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensRepository = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokensRepository {
    accessSecret = process.env.JWT_ACCESS_SECRET;
    refreshSecret = process.env.JWT_REFRESH_SECRET;
    async signAccess(payload) {
        return jsonwebtoken_1.default.sign(payload, this.accessSecret, { expiresIn: "15m" });
    }
    async signRefresh(payload) {
        return jsonwebtoken_1.default.sign(payload, this.refreshSecret, { expiresIn: "3d" });
    }
    async verifyAccess(token) {
        const payload = jsonwebtoken_1.default.verify(token, this.accessSecret);
        return payload;
    }
    async verifyRefresh(token) {
        const payload = jsonwebtoken_1.default.verify(token, this.refreshSecret);
        return payload;
    }
}
exports.TokensRepository = TokensRepository;

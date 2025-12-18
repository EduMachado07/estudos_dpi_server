import { Token } from "../../entities/Token";
import { Role } from "@prisma/client";
import { ITokenRepository } from "../ITokenRepository";
import jwt from "jsonwebtoken";

export class TokensRepository implements ITokenRepository {
  private accessSecret = process.env.JWT_ACCESS_SECRET as string;
  private refreshSecret = process.env.JWT_REFRESH_SECRET as string;

  async signAccess(payload: Token): Promise<string> {
    return jwt.sign(payload, this.accessSecret, { expiresIn: "15m" });
  }
  async signRefresh(payload: Token): Promise<string> {
    return jwt.sign(payload, this.refreshSecret, { expiresIn: "3d" });
  }
  async verifyAccess(token: string): Promise<Token> {
    const payload = jwt.verify(token, this.accessSecret) as { id: string; role: Role, name: string };

    return payload
  }
  async verifyRefresh(token: string): Promise<Token> {
    const payload = jwt.verify(token, this.refreshSecret) as { id: string; role: Role, name: string };

    return payload
  }
}

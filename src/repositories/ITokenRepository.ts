import { Token } from "../entities/Token";

export interface ITokenRepository {
  signAccess(payload: Token): Promise<string>;
  signRefresh(payload: Token): Promise<string>;
  verifyAccess(
    token: string
  ): Promise<Token>;
  verifyRefresh(
    token: string
  ): Promise<Token>;
}

import { User } from "../entities/User";

// Interface que define os métodos do repositório de exemplo.
export interface IUserRepository {
    Register(data: User): Promise<User>;
    FindUserByEmail(email: string): Promise<User | null>;
    FindUserById(id: string): Promise<User | null>;
}
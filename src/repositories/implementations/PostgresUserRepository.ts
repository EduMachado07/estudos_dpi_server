import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../IUserRepository";
import { User } from "../../entities/User";

export const prisma = new PrismaClient();

export class PostgresUserRepository implements IUserRepository {
  async Register(data: User): Promise<User> {
    const user = await prisma.user.create({
      data: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      },
    });

    return user;
  }

  async FindUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  }

  async FindUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user;
  }
}

import { User } from "../../../entities/User";
import { Role } from "@prisma/client";
import { Conflict } from "../../../repositories/IErrorRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { IRegisterUserDTO } from "./Register_DTO";
import bcrypt from "bcrypt";

export class RegisterUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: IRegisterUserDTO) {
    const userAlreadyExists = await this.userRepository.FindUserByEmail(
      data.email
    );
    if (userAlreadyExists) {
      throw new Conflict("Ops! Usuário já cadastrado no nosso sistema");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = new User({
      ...data,
      password: hashedPassword,
      role: data.role ?? Role.READER,
    });
    return await this.userRepository.Register(newUser);
  }
}

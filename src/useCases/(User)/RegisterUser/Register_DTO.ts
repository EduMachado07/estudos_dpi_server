import { z } from "zod";

export const registerUserSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  role: z.enum(["ADMIN", "READER", "AUTHOR"])
});

export type IRegisterUserDTO = z.infer<typeof registerUserSchema>;

import { Request } from "express";
import { Role } from "@prisma/client";

export interface IAuthAuthor extends Request {
  authorId?: string;
  role?: Role;
  name?: string;
}
import { Role } from "@prisma/client";

export class Token {
    public id: string;
    public role: Role;
    public name: string;
}
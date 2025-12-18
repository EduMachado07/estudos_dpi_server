import { v4 as uuidv4 } from "uuid";
import { Role } from "@prisma/client";

export class User {
  public readonly id: string;
  public name: string;
  public email: string;
  public password: string;
  public role: Role;

  constructor(props: Omit<User, "id">, id?: string) {
    Object.assign(this, props);
    this.id = id ?? uuidv4();
  }
}


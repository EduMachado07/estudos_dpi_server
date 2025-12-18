import { v4 as uuidv4 } from "uuid";

export class Study {
  public readonly id: string;
  public slug: string;
  public title: string;
  public description: string;
  public thumbnailId: string;
  public thumbnailUrl: string;
  public body: string;
  public authorId: string;
  // public authorName: string;
  public tag: string;
  public readingTime: number;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(
    props: Omit<
      Study,
      "id" | "createdAt" | "updatedAt"
    >,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    Object.assign(this, props);

    this.id = id ?? uuidv4();
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
  }
}

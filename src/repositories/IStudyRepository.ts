import { Study } from "../entities/Study";

export interface IStudyRepository {
  create(data: Study): Promise<Study>;
  createSlug(author: string, title: string): Promise<string>;
  setReadingTime(body: string): Promise<number>;
  findStudies(
    offset: number,
    limit: number
  ): Promise<{ studies: Study[]; length: number }>;
  findById(id: string): Promise<Study | null>;
  findBySlug(slug: string): Promise<Study | null>;
  findStudiesByAuthorId(
    authorId: string,
    offset: number,
    limit: number
  ): Promise<{ studies: Study[]; length: number }>;
  updateById(id: string, data: Partial<Study>): Promise<Study>;
  deleteById(id: string): Promise<void>;
}

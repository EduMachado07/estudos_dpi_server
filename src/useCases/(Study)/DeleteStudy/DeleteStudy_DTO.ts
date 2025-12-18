import { z } from "zod";

export const deleteStudySchema = z.object({
  id: z.string().min(1, "Autor não informado"),
  authorId: z.string().min(1, "Autor não informado"),
});

export type IDeleteStudyDTO = z.infer<typeof deleteStudySchema>;

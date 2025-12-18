import { z } from "zod";

export const CreateStudySchema = z.object({
  title: z.string().min(1, "Título não informado"),
  description: z.string().min(1, "Descrição não informada"),
  body: z.string(),
  authorId: z.string().min(1, "Autor não informado"),
  tag: z.string().min(1, "Nenhuma tag de estudo informada"),
});

export type ICreateStudyDTO = z.infer<typeof CreateStudySchema>;

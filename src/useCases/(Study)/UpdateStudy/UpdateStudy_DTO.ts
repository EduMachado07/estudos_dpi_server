import { z } from "zod";

export const UpdateStudySchema = z.object({
  authorId: z.string().min(1, "Autor não informado"),
  studyId: z.string().min(1, "Estudo não informado"),
  title: z.string().optional(),
  body: z.string().optional(),
  description: z.string().optional(),
  tag: z.string().optional(),
});

export type IUpdateStudyDTO = z.infer<typeof UpdateStudySchema>;

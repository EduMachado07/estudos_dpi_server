import { z } from "zod";

export const getStudiesSchema = z.object({
  offset: z
    .string()
    .transform((val) => parseInt(val, 10))
    .optional().default(0),
  limit: z
    .string()
    .transform((val) => parseInt(val, 10))
    .optional().default(10)
});

export type IGetStudiesDTO = z.infer<typeof getStudiesSchema>
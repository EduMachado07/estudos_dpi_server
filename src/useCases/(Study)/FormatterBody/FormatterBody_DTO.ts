import {z} from "zod";

export const FormatterBodySchema = z.object({
    content: z.string().min(1, "Texto não informado"),
});

export type IFormatterBodyDTO = z.infer<typeof FormatterBodySchema>;
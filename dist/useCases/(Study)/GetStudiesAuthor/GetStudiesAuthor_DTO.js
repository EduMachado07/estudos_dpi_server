"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetStudiesAuthorSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
exports.GetStudiesAuthorSchema = zod_1.z.object({
    authorId: zod_1.z.string().min(1, "Autor não informado"),
    authorRole: zod_1.z.nativeEnum(client_1.Role),
    authorName: zod_1.z.string().min(1, "Nome do autor não informado"),
    offset: zod_1.z
        .string()
        .transform((val) => parseInt(val, 10))
        .optional()
        .default(0),
    limit: zod_1.z
        .string()
        .transform((val) => parseInt(val, 10))
        .optional()
        .default(10),
});

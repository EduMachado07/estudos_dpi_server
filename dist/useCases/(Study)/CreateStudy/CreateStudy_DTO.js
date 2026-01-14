"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStudySchema = void 0;
const zod_1 = require("zod");
exports.CreateStudySchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Título não informado"),
    description: zod_1.z.string().min(1, "Descrição não informada"),
    body: zod_1.z.string(),
    authorId: zod_1.z.string().min(1, "Autor não informado"),
    tag: zod_1.z.string().min(1, "Nenhuma tag de estudo informada"),
});

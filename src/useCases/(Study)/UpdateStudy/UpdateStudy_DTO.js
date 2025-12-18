"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStudySchema = void 0;
const zod_1 = require("zod");
exports.UpdateStudySchema = zod_1.z.object({
    authorId: zod_1.z.string().min(1, "Autor não informado"),
    studyId: zod_1.z.string().min(1, "Estudo não informado"),
    title: zod_1.z.string().optional(),
    body: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    tag: zod_1.z.string().optional(),
});

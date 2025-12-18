"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudySchema = void 0;
const zod_1 = require("zod");
exports.deleteStudySchema = zod_1.z.object({
    id: zod_1.z.string().min(1, "Autor não informado"),
    authorId: zod_1.z.string().min(1, "Autor não informado"),
});

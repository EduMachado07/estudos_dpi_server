"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudiesSchema = void 0;
const zod_1 = require("zod");
exports.getStudiesSchema = zod_1.z.object({
    offset: zod_1.z
        .string()
        .transform((val) => parseInt(val, 10))
        .optional().default(0),
    limit: zod_1.z
        .string()
        .transform((val) => parseInt(val, 10))
        .optional().default(10)
});

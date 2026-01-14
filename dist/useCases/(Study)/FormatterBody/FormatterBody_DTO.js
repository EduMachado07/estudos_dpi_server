"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatterBodySchema = void 0;
const zod_1 = require("zod");
exports.FormatterBodySchema = zod_1.z.object({
    content: zod_1.z.string().min(1, "Texto não informado"),
});

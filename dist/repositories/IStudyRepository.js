"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const studySelect = client_1.Prisma.validator()({
    id: true,
    title: true,
    description: true,
    thumbnailUrl: true,
    createdAt: true,
    slug: true,
    tag: true,
    author: {
        select: {
            name: true,
        },
    },
});

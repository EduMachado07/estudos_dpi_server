"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Study = void 0;
const uuid_1 = require("uuid");
class Study {
    id;
    slug;
    title;
    description;
    thumbnailId;
    thumbnailUrl;
    body;
    authorId;
    // public authorName: string;
    tag;
    readingTime;
    createdAt;
    updatedAt;
    constructor(props, id, createdAt, updatedAt) {
        Object.assign(this, props);
        this.id = id ?? (0, uuid_1.v4)();
        this.createdAt = createdAt ?? new Date();
        this.updatedAt = updatedAt ?? new Date();
    }
}
exports.Study = Study;

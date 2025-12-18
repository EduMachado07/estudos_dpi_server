"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresStudyRepository = exports.prisma = void 0;
const IErrorRepository_1 = require("../IErrorRepository");
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
class PostgresStudyRepository {
    async createSlug(author, title) {
        const normalizeText = (text) => text
            .normalize("NFD") // separa os acentos das letras
            .replace(/[\u0300-\u036f]/g, "") // remove apenas os acentos
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-") // substitui qualquer coisa que não seja letra ou número por "-"
            .replace(/^-+|-+$/g, ""); // remove "-" do início e do fim
        const authorSlug = normalizeText(author);
        const titleSlug = normalizeText(title);
        let slug = `${authorSlug}/${titleSlug}`;
        let version = 2;
        while (await exports.prisma.study.findUnique({ where: { slug } })) {
            slug = `${authorSlug}/${titleSlug}-v${version}`;
            version++;
        }
        return slug;
    }
    async setReadingTime(body) {
        const words = body.trim().split(/\s+/).length;
        return Math.ceil(words / 200);
    }
    async create(data) {
        const study = await exports.prisma.study.create({
            data: {
                id: data.id,
                title: data.title,
                description: data.description,
                thumbnailId: data.thumbnailId,
                thumbnailUrl: data.thumbnailUrl,
                body: data.body,
                authorId: data.authorId,
                tag: data.tag,
                slug: data.slug,
                readingTime: data.readingTime,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
            },
        });
        return study;
    }
    async findStudies(offset, limit) {
        const [studies, length] = await Promise.all([
            exports.prisma.study.findMany({
                skip: offset,
                take: limit,
                orderBy: { createdAt: "desc" },
            }),
            exports.prisma.study.count(),
        ]);
        return { studies, length };
    }
    async findById(id) {
        const study = await exports.prisma.study.findUnique({
            where: { id },
        });
        return study;
    }
    async findBySlug(slug) {
        const study = await exports.prisma.study.findUnique({
            where: { slug },
            include: {
                author: {
                    select: { name: true },
                },
            },
        });
        return study;
    }
    async findStudiesByAuthorId(authorId, offset, limit) {
        const [studies, length] = await Promise.all([
            exports.prisma.study.findMany({
                where: { authorId },
                skip: offset,
                take: limit,
                orderBy: { createdAt: "desc" },
            }),
            exports.prisma.study.count({ where: { authorId } }),
        ]);
        return { studies, length };
    }
    async deleteById(id) {
        await exports.prisma.study.delete({
            where: { id },
        });
    }
    async updateById(id, data) {
        const studyExists = await exports.prisma.study.findUnique({ where: { id } });
        if (!studyExists)
            throw new IErrorRepository_1.BadRequest("Estudo não encontrado.");
        const { id: _, createdAt: __, ...rest } = data;
        const updated = await exports.prisma.study.update({
            where: { id },
            data: {
                ...rest,
                updatedAt: new Date(),
            },
        });
        return updated;
    }
}
exports.PostgresStudyRepository = PostgresStudyRepository;

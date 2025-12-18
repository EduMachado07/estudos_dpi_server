"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresUserRepository = exports.prisma = void 0;
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
class PostgresUserRepository {
    async Register(data) {
        const user = await exports.prisma.user.create({
            data: {
                id: data.id,
                name: data.name,
                email: data.email,
                password: data.password,
                role: data.role,
            },
        });
        return user;
    }
    async FindUserByEmail(email) {
        const user = await exports.prisma.user.findUnique({
            where: { email },
        });
        return user;
    }
    async FindUserById(id) {
        const user = await exports.prisma.user.findUnique({
            where: { id },
        });
        return user;
    }
}
exports.PostgresUserRepository = PostgresUserRepository;

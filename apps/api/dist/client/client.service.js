"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
let ClientService = class ClientService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(businessId) {
        return this.prisma.client.findMany({
            where: { businessId },
        });
    }
    async create(businessId, data) {
        return this.prisma.client.create({
            data: {
                ...data,
                businessId,
            },
        });
    }
    async findOne(id, businessId) {
        return this.prisma.client.findFirst({
            where: { id, businessId },
        });
    }
    async update(id, businessId, data) {
        return this.prisma.client.updateMany({
            where: { id, businessId },
            data,
        });
    }
    async enablePortal(id, businessId, password) {
        const client = await this.prisma.client.findFirst({
            where: { id, businessId },
        });
        if (!client)
            throw new common_1.NotFoundException('Client not found');
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.prisma.user.create({
            data: {
                email: client.email,
                password: hashedPassword,
                role: 'CLIENT',
                businessId: businessId,
                client: {
                    connect: { id: client.id }
                }
            }
        });
    }
    async disablePortal(id, businessId) {
        const client = await this.prisma.client.findFirst({
            where: { id, businessId },
        });
        if (!client)
            throw new common_1.NotFoundException('Client not found');
        if (!client.userId)
            return { message: 'Portal already disabled' };
        await this.prisma.user.delete({
            where: { id: client.userId },
        });
        return this.prisma.client.update({
            where: { id },
            data: { userId: null },
        });
    }
};
exports.ClientService = ClientService;
exports.ClientService = ClientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClientService);
//# sourceMappingURL=client.service.js.map
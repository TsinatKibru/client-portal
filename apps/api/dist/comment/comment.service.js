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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const pusher_service_1 = require("../realtime/pusher.service");
let CommentService = class CommentService {
    prisma;
    pusher;
    constructor(prisma, pusher) {
        this.prisma = prisma;
        this.pusher = pusher;
    }
    async create(userId, data) {
        const comment = await this.prisma.comment.create({
            data: {
                content: data.content,
                userId: userId,
                projectId: data.projectId,
                fileId: data.fileId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        role: true,
                    },
                },
            },
        });
        const project = await this.prisma.project.findUnique({
            where: { id: data.projectId },
            select: { businessId: true },
        });
        await this.pusher.trigger(`project-${data.projectId}`, 'comment.added', comment);
        await this.prisma.activity.create({
            data: {
                type: 'COMMENT_ADDED',
                description: `A new comment was added`,
                userId: userId,
                projectId: data.projectId,
                businessId: project?.businessId || '',
            },
        });
        return comment;
    }
    async findAll(projectId) {
        return this.prisma.comment.findMany({
            where: { projectId },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        role: true,
                    },
                },
            },
            orderBy: { createdAt: 'asc' },
        });
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        pusher_service_1.PusherService])
], CommentService);
//# sourceMappingURL=comment.service.js.map
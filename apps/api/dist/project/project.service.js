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
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const upload_service_1 = require("../upload/upload.service");
let ProjectService = class ProjectService {
    prisma;
    uploadService;
    constructor(prisma, uploadService) {
        this.prisma = prisma;
        this.uploadService = uploadService;
    }
    async findAll(businessId) {
        return this.prisma.project.findMany({
            where: { businessId },
            include: { client: true },
        });
    }
    async create(businessId, data) {
        return this.prisma.project.create({
            data: {
                title: data.title,
                description: data.description,
                status: data.status || 'PENDING',
                businessId,
                clientId: data.clientId,
            },
        });
    }
    async findOne(id, businessId) {
        return this.prisma.project.findFirst({
            where: { id, businessId },
            include: { client: true, files: true },
        });
    }
    async updateStatus(id, businessId, status) {
        return this.prisma.project.updateMany({
            where: { id, businessId },
            data: { status },
        });
    }
    async delete(id, businessId) {
        console.log(`ProjectService: Starting deletion of project ${id} for business ${businessId}`);
        const files = await this.prisma.file.findMany({
            where: { projectId: id, businessId },
        });
        console.log(`ProjectService: Found ${files.length} files to delete`);
        for (const file of files) {
            if (file.publicId) {
                try {
                    await this.uploadService.deleteFile(file.id, businessId);
                }
                catch (err) {
                    console.error(`ProjectService: Failed to delete file ${file.id} from Cloudinary:`, err);
                }
            }
            else {
                console.log(`ProjectService: Deleting file ${file.id} (no publicId) from DB`);
                await this.prisma.file.delete({ where: { id: file.id } });
            }
        }
        console.log(`ProjectService: Finally deleting project ${id}`);
        return this.prisma.project.delete({
            where: { id, businessId },
        });
    }
    async findAllFiles(businessId) {
        return this.prisma.file.findMany({
            where: { businessId },
            include: { project: true },
            orderBy: { createdAt: 'desc' },
        });
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        upload_service_1.UploadService])
], ProjectService);
//# sourceMappingURL=project.service.js.map
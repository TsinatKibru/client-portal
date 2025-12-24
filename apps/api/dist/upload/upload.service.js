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
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const prisma_service_1 = require("../prisma/prisma.service");
let UploadService = class UploadService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }
    async uploadFile(file, businessId, projectId) {
        return new Promise((resolve, reject) => {
            const upload = cloudinary_1.v2.uploader.upload_stream({
                folder: `client-portal/${businessId}/${projectId || 'general'}`,
                upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
                resource_type: 'auto',
            }, async (error, result) => {
                if (error)
                    return reject(error);
                if (!result)
                    return reject(new Error('Upload failed: no result returned'));
                if (!projectId || projectId === 'branding') {
                    return resolve({ url: result.secure_url });
                }
                const savedFile = await this.prisma.file.create({
                    data: {
                        name: file.originalname,
                        url: result.secure_url,
                        publicId: result.public_id,
                        type: file.mimetype,
                        businessId,
                        projectId,
                    },
                });
                resolve(savedFile);
            });
            upload.end(file.buffer);
        });
    }
    async deleteFile(fileId, businessId) {
        console.log(`UploadService: Attempting to delete file ${fileId} for business ${businessId}`);
        const file = await this.prisma.file.findFirst({
            where: { id: fileId, businessId },
        });
        if (!file) {
            console.error(`UploadService: File ${fileId} not found or doesn't belong to business ${businessId}`);
            throw new Error('File not found or access denied');
        }
        if (file.publicId) {
            try {
                console.log(`UploadService: Destroying Cloudinary asset ${file.publicId}`);
                await cloudinary_1.v2.uploader.destroy(file.publicId);
            }
            catch (err) {
                console.error(`UploadService: Cloudinary destroy failed for ${file.publicId}:`, err);
            }
        }
        console.log(`UploadService: Deleting file ${fileId} from database`);
        return this.prisma.file.delete({
            where: { id: fileId },
        });
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UploadService);
//# sourceMappingURL=upload.service.js.map
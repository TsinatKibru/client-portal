import { PrismaService } from '../prisma/prisma.service';
export declare class UploadService {
    private prisma;
    constructor(prisma: PrismaService);
    uploadFile(file: Express.Multer.File, businessId: string, projectId?: string): Promise<unknown>;
    deleteFile(fileId: string, businessId: string): Promise<{
        id: string;
        businessId: string;
        createdAt: Date;
        name: string;
        url: string;
        publicId: string | null;
        type: string;
        projectId: string;
    }>;
}

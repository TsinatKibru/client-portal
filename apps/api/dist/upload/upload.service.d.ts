import { PrismaService } from '../prisma/prisma.service';
import { PusherService } from '../realtime/pusher.service';
export declare class UploadService {
    private prisma;
    private pusher;
    constructor(prisma: PrismaService, pusher: PusherService);
    uploadFile(file: Express.Multer.File, businessId: string, projectId?: string, userId?: string): Promise<unknown>;
    deleteFile(fileId: string, businessId: string): Promise<{
        id: string;
        createdAt: Date;
        projectId: string;
        businessId: string;
        name: string;
        url: string;
        publicId: string | null;
        type: string;
    }>;
}

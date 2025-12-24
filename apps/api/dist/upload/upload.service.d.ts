import { PrismaService } from '../prisma/prisma.service';
export declare class UploadService {
    private prisma;
    constructor(prisma: PrismaService);
    uploadFile(file: Express.Multer.File, businessId: string, projectId: string): Promise<unknown>;
}

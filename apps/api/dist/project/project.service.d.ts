import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
export declare class ProjectService {
    private prisma;
    private uploadService;
    constructor(prisma: PrismaService, uploadService: UploadService);
    findAll(businessId: string): Promise<({
        client: {
            id: string;
            email: string;
            businessId: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            phone: string | null;
            userId: string | null;
        };
    } & {
        id: string;
        businessId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.ProjectStatus;
        title: string;
        description: string | null;
        clientId: string;
    })[]>;
    create(businessId: string, data: any): Promise<{
        id: string;
        businessId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.ProjectStatus;
        title: string;
        description: string | null;
        clientId: string;
    }>;
    findOne(id: string, businessId: string): Promise<({
        client: {
            id: string;
            email: string;
            businessId: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            phone: string | null;
            userId: string | null;
        };
        files: {
            id: string;
            businessId: string;
            createdAt: Date;
            name: string;
            url: string;
            publicId: string | null;
            type: string;
            projectId: string;
        }[];
    } & {
        id: string;
        businessId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.ProjectStatus;
        title: string;
        description: string | null;
        clientId: string;
    }) | null>;
    updateStatus(id: string, businessId: string, status: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
    delete(id: string, businessId: string): Promise<{
        id: string;
        businessId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.ProjectStatus;
        title: string;
        description: string | null;
        clientId: string;
    }>;
    findAllFiles(businessId: string): Promise<({
        project: {
            id: string;
            businessId: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.ProjectStatus;
            title: string;
            description: string | null;
            clientId: string;
        };
    } & {
        id: string;
        businessId: string;
        createdAt: Date;
        name: string;
        url: string;
        publicId: string | null;
        type: string;
        projectId: string;
    })[]>;
}

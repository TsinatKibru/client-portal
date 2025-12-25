import { ProjectStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
import { PusherService } from '../realtime/pusher.service';
export declare class ProjectService {
    private prisma;
    private uploadService;
    private pusher;
    constructor(prisma: PrismaService, uploadService: UploadService, pusher: PusherService);
    findAll(businessId: string): Promise<({
        client: {
            id: string;
            createdAt: Date;
            userId: string | null;
            email: string;
            businessId: string;
            updatedAt: Date;
            name: string;
            phone: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        businessId: string;
        updatedAt: Date;
        title: string;
        description: string | null;
        status: import("@prisma/client").$Enums.ProjectStatus;
        clientId: string;
    })[]>;
    create(businessId: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        businessId: string;
        updatedAt: Date;
        title: string;
        description: string | null;
        status: import("@prisma/client").$Enums.ProjectStatus;
        clientId: string;
    }>;
    findOne(id: string, businessId: string): Promise<({
        client: {
            id: string;
            createdAt: Date;
            userId: string | null;
            email: string;
            businessId: string;
            updatedAt: Date;
            name: string;
            phone: string | null;
        };
        files: {
            id: string;
            createdAt: Date;
            projectId: string;
            businessId: string;
            name: string;
            url: string;
            publicId: string | null;
            type: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        businessId: string;
        updatedAt: Date;
        title: string;
        description: string | null;
        status: import("@prisma/client").$Enums.ProjectStatus;
        clientId: string;
    }) | null>;
    updateStatus(id: string, businessId: string, status: ProjectStatus, userId: string): Promise<{
        id: string;
        createdAt: Date;
        businessId: string;
        updatedAt: Date;
        title: string;
        description: string | null;
        status: import("@prisma/client").$Enums.ProjectStatus;
        clientId: string;
    }>;
    delete(id: string, businessId: string): Promise<{
        id: string;
        createdAt: Date;
        businessId: string;
        updatedAt: Date;
        title: string;
        description: string | null;
        status: import("@prisma/client").$Enums.ProjectStatus;
        clientId: string;
    }>;
    findAllFiles(businessId: string): Promise<({
        project: {
            id: string;
            createdAt: Date;
            businessId: string;
            updatedAt: Date;
            title: string;
            description: string | null;
            status: import("@prisma/client").$Enums.ProjectStatus;
            clientId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        projectId: string;
        businessId: string;
        name: string;
        url: string;
        publicId: string | null;
        type: string;
    })[]>;
}

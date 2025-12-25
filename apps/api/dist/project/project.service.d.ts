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
            email: string;
            businessId: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            userId: string | null;
            phone: string | null;
        };
    } & {
        id: string;
        businessId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.ProjectStatus;
        description: string | null;
        title: string;
        clientId: string;
    })[]>;
    create(businessId: string, data: any): Promise<{
        id: string;
        businessId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.ProjectStatus;
        description: string | null;
        title: string;
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
            userId: string | null;
            phone: string | null;
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
        status: import("@prisma/client").$Enums.ProjectStatus;
        description: string | null;
        title: string;
        clientId: string;
    }) | null>;
    updateStatus(id: string, businessId: string, status: ProjectStatus, userId: string): Promise<{
        id: string;
        businessId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.ProjectStatus;
        description: string | null;
        title: string;
        clientId: string;
    }>;
    delete(id: string, businessId: string): Promise<{
        id: string;
        businessId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.ProjectStatus;
        description: string | null;
        title: string;
        clientId: string;
    }>;
    findAllFiles(businessId: string): Promise<({
        project: {
            id: string;
            businessId: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.ProjectStatus;
            description: string | null;
            title: string;
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

import { PrismaService } from '../prisma/prisma.service';
export declare class ProjectService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(businessId: string): Promise<({
        client: {
            id: string;
            email: string;
            businessId: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            phone: string | null;
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
        };
        files: {
            id: string;
            businessId: string;
            createdAt: Date;
            name: string;
            url: string;
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
}

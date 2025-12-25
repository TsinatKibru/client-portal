import { PrismaService } from '../prisma/prisma.service';
export declare class ActivityService {
    private prisma;
    constructor(prisma: PrismaService);
    log(data: {
        type: string;
        description: string;
        userId: string;
        projectId: string;
        businessId: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        projectId: string;
        businessId: string;
        description: string;
        type: string;
    }>;
    findAll(projectId: string): Promise<({
        user: {
            id: string;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        projectId: string;
        businessId: string;
        description: string;
        type: string;
    })[]>;
    findAllByBusiness(businessId: string, limit?: number): Promise<({
        user: {
            id: string;
            email: string;
        };
        project: {
            title: string;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        projectId: string;
        businessId: string;
        description: string;
        type: string;
    })[]>;
}

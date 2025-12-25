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
        type: string;
        description: string;
        createdAt: Date;
        userId: string;
        projectId: string;
        businessId: string;
    }>;
    findAll(projectId: string): Promise<({
        user: {
            id: string;
            email: string;
        };
    } & {
        id: string;
        type: string;
        description: string;
        createdAt: Date;
        userId: string;
        projectId: string;
        businessId: string;
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
        type: string;
        description: string;
        createdAt: Date;
        userId: string;
        projectId: string;
        businessId: string;
    })[]>;
}

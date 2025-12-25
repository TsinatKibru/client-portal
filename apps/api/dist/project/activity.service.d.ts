import { PrismaService } from '../prisma/prisma.service';
export declare class ActivityService {
    private prisma;
    constructor(prisma: PrismaService);
    log(data: {
        type: string;
        description: string;
        userId: string;
        projectId: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        type: string;
        projectId: string;
        description: string;
        userId: string;
    }>;
    findAll(projectId: string): Promise<({
        user: {
            id: string;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        type: string;
        projectId: string;
        description: string;
        userId: string;
    })[]>;
}

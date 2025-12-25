import { PrismaService } from '../prisma/prisma.service';
import { PusherService } from '../realtime/pusher.service';
export declare class CommentService {
    private prisma;
    private pusher;
    constructor(prisma: PrismaService, pusher: PusherService);
    create(userId: string, data: {
        projectId: string;
        content: string;
        fileId?: string;
    }): Promise<{
        user: {
            id: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
        };
    } & {
        id: string;
        content: string;
        createdAt: Date;
        userId: string;
        projectId: string;
        fileId: string | null;
    }>;
    findAll(projectId: string): Promise<({
        user: {
            id: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
        };
    } & {
        id: string;
        content: string;
        createdAt: Date;
        userId: string;
        projectId: string;
        fileId: string | null;
    })[]>;
}

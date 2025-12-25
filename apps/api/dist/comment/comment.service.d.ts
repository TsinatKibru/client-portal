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
        createdAt: Date;
        projectId: string;
        userId: string;
        fileId: string | null;
        content: string;
    }>;
    findAll(projectId: string): Promise<({
        user: {
            id: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
        };
    } & {
        id: string;
        createdAt: Date;
        projectId: string;
        userId: string;
        fileId: string | null;
        content: string;
    })[]>;
}

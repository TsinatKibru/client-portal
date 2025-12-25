import { CommentService } from './comment.service';
export declare class CommentController {
    private commentService;
    constructor(commentService: CommentService);
    create(req: any, body: {
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

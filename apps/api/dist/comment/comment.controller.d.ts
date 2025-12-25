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

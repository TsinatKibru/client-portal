import { ProjectService } from './project.service';
export declare class ProjectController {
    private projectService;
    constructor(projectService: ProjectService);
    findAll(req: any): Promise<({
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
    findAllFiles(req: any): Promise<({
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
    create(req: any, body: any): Promise<{
        id: string;
        createdAt: Date;
        businessId: string;
        updatedAt: Date;
        title: string;
        description: string | null;
        status: import("@prisma/client").$Enums.ProjectStatus;
        clientId: string;
    }>;
    findOne(id: string, req: any): Promise<({
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
    updateStatus(id: string, req: any, body: {
        status: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        businessId: string;
        updatedAt: Date;
        title: string;
        description: string | null;
        status: import("@prisma/client").$Enums.ProjectStatus;
        clientId: string;
    }>;
    delete(id: string, req: any): Promise<{
        id: string;
        createdAt: Date;
        businessId: string;
        updatedAt: Date;
        title: string;
        description: string | null;
        status: import("@prisma/client").$Enums.ProjectStatus;
        clientId: string;
    }>;
}

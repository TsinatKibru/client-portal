import { ProjectService } from './project.service';
export declare class ProjectController {
    private projectService;
    constructor(projectService: ProjectService);
    findAll(req: any): Promise<({
        client: {
            id: string;
            email: string;
            businessId: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            phone: string | null;
            userId: string | null;
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
    findAllFiles(req: any): Promise<({
        project: {
            id: string;
            businessId: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.ProjectStatus;
            title: string;
            description: string | null;
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
    create(req: any, body: any): Promise<{
        id: string;
        businessId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.ProjectStatus;
        title: string;
        description: string | null;
        clientId: string;
    }>;
    findOne(id: string, req: any): Promise<({
        client: {
            id: string;
            email: string;
            businessId: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            phone: string | null;
            userId: string | null;
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
        status: import(".prisma/client").$Enums.ProjectStatus;
        title: string;
        description: string | null;
        clientId: string;
    }) | null>;
    updateStatus(id: string, req: any, body: {
        status: string;
    }): Promise<import(".prisma/client").Prisma.BatchPayload>;
    delete(id: string, req: any): Promise<{
        id: string;
        businessId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.ProjectStatus;
        title: string;
        description: string | null;
        clientId: string;
    }>;
}

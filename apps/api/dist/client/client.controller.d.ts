import { ClientService } from './client.service';
export declare class ClientController {
    private clientService;
    constructor(clientService: ClientService);
    findAll(req: any): Promise<{
        id: string;
        createdAt: Date;
        userId: string | null;
        email: string;
        businessId: string;
        updatedAt: Date;
        name: string;
        phone: string | null;
    }[]>;
    create(req: any, body: any): Promise<{
        id: string;
        createdAt: Date;
        userId: string | null;
        email: string;
        businessId: string;
        updatedAt: Date;
        name: string;
        phone: string | null;
    }>;
    findOne(id: string, req: any): Promise<{
        id: string;
        createdAt: Date;
        userId: string | null;
        email: string;
        businessId: string;
        updatedAt: Date;
        name: string;
        phone: string | null;
    } | null>;
    update(id: string, req: any, body: any): Promise<import("@prisma/client").Prisma.BatchPayload>;
    enablePortal(id: string, req: any, body: {
        password: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.Role;
        businessId: string;
        updatedAt: Date;
    }>;
    disablePortal(id: string, req: any): Promise<{
        id: string;
        createdAt: Date;
        userId: string | null;
        email: string;
        businessId: string;
        updatedAt: Date;
        name: string;
        phone: string | null;
    } | {
        message: string;
    }>;
}

import { ClientService } from './client.service';
export declare class ClientController {
    private clientService;
    constructor(clientService: ClientService);
    findAll(req: any): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string | null;
        businessId: string;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    create(req: any, body: any): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string | null;
        businessId: string;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findOne(id: string, req: any): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string | null;
        businessId: string;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    update(id: string, req: any, body: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
    enablePortal(id: string, req: any, body: {
        password: string;
    }): Promise<{
        id: string;
        email: string;
        businessId: string;
        createdAt: Date;
        updatedAt: Date;
        password: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    disablePortal(id: string, req: any): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string | null;
        businessId: string;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | {
        message: string;
    }>;
}

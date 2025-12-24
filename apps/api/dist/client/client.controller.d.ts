import { ClientService } from './client.service';
export declare class ClientController {
    private clientService;
    constructor(clientService: ClientService);
    findAll(req: any): Promise<{
        id: string;
        email: string;
        businessId: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        phone: string | null;
        userId: string | null;
    }[]>;
    create(req: any, body: any): Promise<{
        id: string;
        email: string;
        businessId: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        phone: string | null;
        userId: string | null;
    }>;
    findOne(id: string, req: any): Promise<{
        id: string;
        email: string;
        businessId: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        phone: string | null;
        userId: string | null;
    } | null>;
    update(id: string, req: any, body: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
    enablePortal(id: string, req: any, body: {
        password: string;
    }): Promise<{
        id: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        businessId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}

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
    }[]>;
    create(req: any, body: any): Promise<{
        id: string;
        email: string;
        businessId: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        phone: string | null;
    }>;
    findOne(id: string, req: any): Promise<{
        id: string;
        email: string;
        businessId: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        phone: string | null;
    } | null>;
    update(id: string, req: any, body: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
}

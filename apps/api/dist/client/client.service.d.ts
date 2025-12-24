import { PrismaService } from '../prisma/prisma.service';
export declare class ClientService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(businessId: string): Promise<{
        id: string;
        email: string;
        businessId: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        phone: string | null;
    }[]>;
    create(businessId: string, data: any): Promise<{
        id: string;
        email: string;
        businessId: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        phone: string | null;
    }>;
    findOne(id: string, businessId: string): Promise<{
        id: string;
        email: string;
        businessId: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        phone: string | null;
    } | null>;
    update(id: string, businessId: string, data: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
}

import { PrismaService } from '../prisma/prisma.service';
export declare class ClientService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(businessId: string): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string | null;
        businessId: string;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    create(businessId: string, data: any): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string | null;
        businessId: string;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findOne(id: string, businessId: string): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string | null;
        businessId: string;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    update(id: string, businessId: string, data: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
    enablePortal(id: string, businessId: string, password: string): Promise<{
        id: string;
        email: string;
        businessId: string;
        createdAt: Date;
        updatedAt: Date;
        password: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    disablePortal(id: string, businessId: string): Promise<{
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

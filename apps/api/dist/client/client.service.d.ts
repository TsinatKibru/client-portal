import { PrismaService } from '../prisma/prisma.service';
export declare class ClientService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(businessId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string | null;
        email: string;
        businessId: string;
        updatedAt: Date;
        name: string;
        phone: string | null;
    }[]>;
    create(businessId: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        userId: string | null;
        email: string;
        businessId: string;
        updatedAt: Date;
        name: string;
        phone: string | null;
    }>;
    findOne(id: string, businessId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string | null;
        email: string;
        businessId: string;
        updatedAt: Date;
        name: string;
        phone: string | null;
    } | null>;
    update(id: string, businessId: string, data: any): Promise<import("@prisma/client").Prisma.BatchPayload>;
    enablePortal(id: string, businessId: string, password: string): Promise<{
        id: string;
        createdAt: Date;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.Role;
        businessId: string;
        updatedAt: Date;
    }>;
    disablePortal(id: string, businessId: string): Promise<{
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

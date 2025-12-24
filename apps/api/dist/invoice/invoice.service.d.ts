import { PrismaService } from '../prisma/prisma.service';
export declare class InvoiceService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(businessId: string): Promise<({
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
        status: import(".prisma/client").$Enums.InvoiceStatus;
        clientId: string;
        invoiceNumber: string;
        amount: number;
    })[]>;
    create(businessId: string, data: any): Promise<{
        id: string;
        businessId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.InvoiceStatus;
        clientId: string;
        invoiceNumber: string;
        amount: number;
    }>;
    findOne(id: string, businessId: string): Promise<{
        business: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            slug: string;
            logo: string | null;
            status: string;
        };
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
        status: import(".prisma/client").$Enums.InvoiceStatus;
        clientId: string;
        invoiceNumber: string;
        amount: number;
    }>;
    updateStatus(id: string, businessId: string, status: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
    generatePdf(id: string, businessId: string): Promise<Buffer>;
}

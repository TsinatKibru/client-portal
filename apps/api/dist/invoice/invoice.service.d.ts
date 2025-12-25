import { PrismaService } from '../prisma/prisma.service';
export declare class InvoiceService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(businessId: string): Promise<({
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
        status: import("@prisma/client").$Enums.InvoiceStatus;
        clientId: string;
        invoiceNumber: string;
        amount: number;
        lineItems: import("@prisma/client/runtime/library").JsonValue | null;
        subtotal: number;
        tax: number;
        total: number;
    })[]>;
    create(businessId: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        businessId: string;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.InvoiceStatus;
        clientId: string;
        invoiceNumber: string;
        amount: number;
        lineItems: import("@prisma/client/runtime/library").JsonValue | null;
        subtotal: number;
        tax: number;
        total: number;
    }>;
    findOne(id: string, businessId: string): Promise<{
        business: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            status: string;
            logo: string | null;
            slug: string;
            currency: string;
            brandColor: string;
            address: string | null;
            taxId: string | null;
        };
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
        status: import("@prisma/client").$Enums.InvoiceStatus;
        clientId: string;
        invoiceNumber: string;
        amount: number;
        lineItems: import("@prisma/client/runtime/library").JsonValue | null;
        subtotal: number;
        tax: number;
        total: number;
    }>;
    updateStatus(id: string, businessId: string, status: any): Promise<import("@prisma/client").Prisma.BatchPayload>;
    generatePdf(id: string, businessId: string): Promise<Buffer>;
    private generateTableRow;
    private generateHr;
}

import { PrismaService } from '../prisma/prisma.service';
export declare class PortalService {
    private prisma;
    constructor(prisma: PrismaService);
    getClientProjects(userId: string): Promise<({
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
    })[]>;
    getClientInvoices(userId: string): Promise<{
        id: string;
        businessId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.InvoiceStatus;
        clientId: string;
        invoiceNumber: string;
        amount: number;
        lineItems: import("@prisma/client/runtime/library").JsonValue | null;
        subtotal: number;
        tax: number;
        total: number;
    }[]>;
}

import { PrismaService } from '../prisma/prisma.service';
export declare class PortalService {
    private prisma;
    constructor(prisma: PrismaService);
    getClientProjects(userId: string): Promise<({
        files: {
            id: string;
            createdAt: Date;
            projectId: string;
            businessId: string;
            name: string;
            url: string;
            publicId: string | null;
            type: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        businessId: string;
        updatedAt: Date;
        title: string;
        description: string | null;
        status: import("@prisma/client").$Enums.ProjectStatus;
        clientId: string;
    })[]>;
    getClientInvoices(userId: string): Promise<{
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
    }[]>;
}

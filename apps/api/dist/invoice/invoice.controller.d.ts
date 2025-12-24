import { InvoiceService } from './invoice.service';
import { Response } from 'express';
export declare class InvoiceController {
    private invoiceService;
    constructor(invoiceService: InvoiceService);
    findAll(req: any): Promise<({
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
    create(req: any, body: any): Promise<{
        id: string;
        businessId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.InvoiceStatus;
        clientId: string;
        invoiceNumber: string;
        amount: number;
    }>;
    findOne(id: string, req: any): Promise<{
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
    updateStatus(id: string, req: any, body: {
        status: string;
    }): Promise<import(".prisma/client").Prisma.BatchPayload>;
    downloadPdf(id: string, req: any, res: Response): Promise<void>;
}

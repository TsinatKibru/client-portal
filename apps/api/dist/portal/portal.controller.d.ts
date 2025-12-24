import { PortalService } from './portal.service';
export declare class PortalController {
    private portalService;
    constructor(portalService: PortalService);
    getProjects(req: any): Promise<({
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
    getInvoices(req: any): Promise<{
        id: string;
        businessId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.InvoiceStatus;
        clientId: string;
        invoiceNumber: string;
        amount: number;
    }[]>;
}

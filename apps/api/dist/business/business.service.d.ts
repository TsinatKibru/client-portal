import { PrismaService } from '../prisma/prisma.service';
export declare class BusinessService {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(id: String): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        logo: string | null;
        status: string;
        currency: string;
        brandColor: string;
        address: string | null;
        taxId: string | null;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        logo: string | null;
        status: string;
        currency: string;
        brandColor: string;
        address: string | null;
        taxId: string | null;
    }>;
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PortalService {
    constructor(private prisma: PrismaService) { }

    async getClientProjects(userId: string) {
        const client = await this.prisma.client.findFirst({
            where: { userId },
        });
        if (!client) return [];

        return this.prisma.project.findMany({
            where: { clientId: client.id, businessId: client.businessId },
            include: { files: true },
            orderBy: { updatedAt: 'desc' },
        });
    }

    async getClientInvoices(userId: string) {
        const client = await this.prisma.client.findFirst({
            where: { userId },
        });
        if (!client) return [];

        return this.prisma.invoice.findMany({
            where: { clientId: client.id, businessId: client.businessId },
            orderBy: { createdAt: 'desc' },
        });
    }
}

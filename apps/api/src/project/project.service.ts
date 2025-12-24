import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectService {
    constructor(private prisma: PrismaService) { }

    async findAll(businessId: string) {
        return this.prisma.project.findMany({
            where: { businessId },
            include: { client: true },
        });
    }

    async create(businessId: string, data: any) {
        return this.prisma.project.create({
            data: {
                title: data.title,
                description: data.description,
                status: data.status || 'PENDING',
                businessId,
                clientId: data.clientId,
            },
        });
    }

    async findOne(id: string, businessId: string) {
        return this.prisma.project.findFirst({
            where: { id, businessId },
            include: { client: true, files: true },
        });
    }

    async updateStatus(id: string, businessId: string, status: any) {
        return this.prisma.project.updateMany({
            where: { id, businessId },
            data: { status },
        });
    }
}

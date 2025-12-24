import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClientService {
    constructor(private prisma: PrismaService) { }

    async findAll(businessId: string) {
        return this.prisma.client.findMany({
            where: { businessId },
        });
    }

    async create(businessId: string, data: any) {
        return this.prisma.client.create({
            data: {
                ...data,
                businessId,
            },
        });
    }

    async findOne(id: string, businessId: string) {
        return this.prisma.client.findFirst({
            where: { id, businessId },
        });
    }

    async update(id: string, businessId: string, data: any) {
        return this.prisma.client.updateMany({
            where: { id, businessId },
            data,
        });
    }
}

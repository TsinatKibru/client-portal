import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

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

    async enablePortal(id: string, businessId: string, password: string) {
        const client = await this.prisma.client.findFirst({
            where: { id, businessId },
        });

        if (!client) throw new NotFoundException('Client not found');

        const hashedPassword = await bcrypt.hash(password, 10);

        return this.prisma.user.create({
            data: {
                email: client.email,
                password: hashedPassword,
                role: 'CLIENT',
                businessId: businessId,
                client: {
                    connect: { id: client.id }
                }
            }
        });
    }

    async disablePortal(id: string, businessId: string) {
        const client = await this.prisma.client.findFirst({
            where: { id, businessId },
        });

        if (!client) throw new NotFoundException('Client not found');
        if (!client.userId) return { message: 'Portal already disabled' };

        // Delete the user record
        await this.prisma.user.delete({
            where: { id: client.userId },
        });

        // The userId in Client model should be nullified
        return this.prisma.client.update({
            where: { id },
            data: { userId: null },
        });
    }
}

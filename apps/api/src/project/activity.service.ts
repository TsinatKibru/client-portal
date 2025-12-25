import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ActivityService {
    constructor(private prisma: PrismaService) { }

    async log(data: { type: string; description: string; userId: string; projectId: string; businessId: string }) {
        return this.prisma.activity.create({
            data: {
                type: data.type,
                description: data.description,
                userId: data.userId,
                projectId: data.projectId,
                businessId: data.businessId,
            },
        });
    }

    async findAll(projectId: string) {
        return this.prisma.activity.findMany({
            where: { projectId },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findAllByBusiness(businessId: string, limit = 10) {
        return this.prisma.activity.findMany({
            where: { businessId },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
                project: {
                    select: {
                        title: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
            take: limit,
        });
    }
}

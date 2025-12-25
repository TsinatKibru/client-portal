import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ActivityService {
    constructor(private prisma: PrismaService) { }

    async log(data: { type: string; description: string; userId: string; projectId: string }) {
        return this.prisma.activity.create({
            data: {
                type: data.type,
                description: data.description,
                userId: data.userId,
                projectId: data.projectId,
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
}

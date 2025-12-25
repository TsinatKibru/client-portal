import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PusherService } from '../realtime/pusher.service';

@Injectable()
export class CommentService {
    constructor(
        private prisma: PrismaService,
        private pusher: PusherService,
    ) { }

    async create(userId: string, data: { projectId: string; content: string; fileId?: string }) {
        const comment = await this.prisma.comment.create({
            data: {
                content: data.content,
                userId: userId,
                projectId: data.projectId,
                fileId: data.fileId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        role: true,
                    },
                },
            },
        });

        const project = await this.prisma.project.findUnique({
            where: { id: data.projectId },
            select: { businessId: true },
        });

        // Trigger real-time event
        await this.pusher.trigger(
            `project-${data.projectId}`,
            'comment.added',
            comment,
        );

        // Also log activity
        await this.prisma.activity.create({
            data: {
                type: 'COMMENT_ADDED',
                description: `A new comment was added`,
                userId: userId,
                projectId: data.projectId,
                businessId: project?.businessId || '',
            },
        });

        return comment;
    }

    async findAll(projectId: string) {
        return this.prisma.comment.findMany({
            where: { projectId },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        role: true,
                    },
                },
            },
            orderBy: { createdAt: 'asc' },
        });
    }
}

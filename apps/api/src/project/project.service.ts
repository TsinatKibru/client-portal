import { ProjectStatus } from '@prisma/client';
import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
import { PusherService } from '../realtime/pusher.service';

@Injectable()
export class ProjectService {
    constructor(
        private prisma: PrismaService,
        private uploadService: UploadService,
        private pusher: PusherService,
    ) { }

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

    async updateStatus(id: string, businessId: string, status: ProjectStatus, userId: string) {
        const project = await this.prisma.project.update({
            where: { id },
            data: { status },
        });

        // Log activity
        await this.prisma.activity.create({
            data: {
                type: 'STATUS_CHANGE',
                description: `Status changed to ${status}`,
                userId,
                projectId: id,
                businessId,
            },
        }).catch(err => console.error("Failed to log status change activity", err));

        // Trigger real-time update
        await this.pusher.trigger(`project-${id}`, 'status.updated', { status });

        return project;
    }

    async delete(id: string, businessId: string) {
        console.log(`ProjectService: Starting deletion of project ${id} for business ${businessId}`);
        // Find files associated with the project to delete them from Cloudinary
        const files = await this.prisma.file.findMany({
            where: { projectId: id, businessId },
        });

        console.log(`ProjectService: Found ${files.length} files to delete`);

        for (const file of files) {
            if (file.publicId) {
                try {
                    await this.uploadService.deleteFile(file.id, businessId);
                } catch (err) {
                    console.error(`ProjectService: Failed to delete file ${file.id} from Cloudinary:`, err);
                }
            } else {
                console.log(`ProjectService: Deleting file ${file.id} (no publicId) from DB`);
                await this.prisma.file.delete({ where: { id: file.id } });
            }
        }

        console.log(`ProjectService: Finally deleting project ${id}`);
        return this.prisma.project.delete({
            where: { id, businessId },
        });
    }

    async findAllFiles(businessId: string) {
        return this.prisma.file.findMany({
            where: { businessId },
            include: { project: true },
            orderBy: { createdAt: 'desc' },
        });
    }
}

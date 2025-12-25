import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { PrismaService } from '../prisma/prisma.service';
import { PusherService } from '../realtime/pusher.service';

@Injectable()
export class UploadService {
    constructor(
        private prisma: PrismaService,
        private pusher: PusherService,
    ) {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }

    async uploadFile(file: Express.Multer.File, businessId: string, projectId?: string, userId?: string) {
        return new Promise((resolve, reject) => {
            const upload = cloudinary.uploader.upload_stream(
                {
                    folder: `client-portal/${businessId}/${projectId || 'general'}`,
                    upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
                    resource_type: 'auto',
                },
                async (error, result) => {
                    if (error) return reject(error);
                    if (!result) return reject(new Error('Upload failed: no result returned'));

                    if (!projectId || projectId === 'branding') {
                        return resolve({ url: result.secure_url });
                    }

                    const savedFile = await this.prisma.file.create({
                        data: {
                            name: file.originalname,
                            url: result.secure_url,
                            publicId: result.public_id,
                            type: file.mimetype,
                            businessId,
                            projectId,
                        },
                    });

                    // Log activity if userId is provided
                    if (userId && projectId) {
                        await this.prisma.activity.create({
                            data: {
                                type: 'FILE_UPLOAD',
                                description: `Uploaded file: ${file.originalname}`,
                                userId,
                                projectId,
                                businessId,
                            },
                        }).catch(err => console.error("Failed to log upload activity", err));
                    }

                    // Trigger Pusher
                    await this.pusher.trigger(`project-${projectId}`, 'file.uploaded', savedFile);

                    resolve(savedFile);
                },
            );
            upload.end(file.buffer);
        });
    }

    async deleteFile(fileId: string, businessId: string) {
        console.log(`UploadService: Attempting to delete file ${fileId} for business ${businessId}`);
        const file = await this.prisma.file.findFirst({
            where: { id: fileId, businessId },
        });

        if (!file) {
            console.error(`UploadService: File ${fileId} not found or doesn't belong to business ${businessId}`);
            throw new Error('File not found or access denied');
        }

        // Delete from Cloudinary if publicId exists
        if (file.publicId) {
            try {
                console.log(`UploadService: Destroying Cloudinary asset ${file.publicId}`);
                await cloudinary.uploader.destroy(file.publicId);
            } catch (err) {
                console.error(`UploadService: Cloudinary destroy failed for ${file.publicId}:`, err);
                // Carry on to delete from DB even if Cloudinary fails
            }
        }

        // Delete from database
        console.log(`UploadService: Deleting file ${fileId} from database`);
        return this.prisma.file.delete({
            where: { id: fileId },
        });
    }
}

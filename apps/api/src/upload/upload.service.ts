import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UploadService {
    constructor(private prisma: PrismaService) {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }

    async uploadFile(file: Express.Multer.File, businessId: string, projectId: string) {
        return new Promise((resolve, reject) => {
            const upload = cloudinary.uploader.upload_stream(
                {
                    folder: `client-portal/${businessId}/${projectId}`,
                    upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
                },
                async (error, result) => {
                    if (error) return reject(error);
                    if (!result) return reject(new Error('Upload failed: no result returned'));

                    const savedFile = await this.prisma.file.create({
                        data: {
                            name: file.originalname,
                            url: result.secure_url,
                            type: file.mimetype,
                            businessId,
                            projectId,
                        },
                    });
                    resolve(savedFile);
                },
            );
            upload.end(file.buffer);
        });
    }
}

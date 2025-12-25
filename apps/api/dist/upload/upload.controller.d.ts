import { UploadService } from './upload.service';
export declare class UploadController {
    private uploadService;
    constructor(uploadService: UploadService);
    uploadFile(file: Express.Multer.File, req: any, projectId: string): Promise<unknown>;
    deleteFile(fileId: string, req: any): Promise<{
        id: string;
        createdAt: Date;
        projectId: string;
        businessId: string;
        name: string;
        url: string;
        publicId: string | null;
        type: string;
    }>;
    deleteFileAny(fileId: string, req: any): Promise<{
        id: string;
        createdAt: Date;
        projectId: string;
        businessId: string;
        name: string;
        url: string;
        publicId: string | null;
        type: string;
    }>;
}

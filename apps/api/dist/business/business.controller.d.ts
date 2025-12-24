import { UploadService } from '../upload/upload.service';
import { BusinessService } from './business.service';
export declare class BusinessController {
    private businessService;
    private uploadService;
    constructor(businessService: BusinessService, uploadService: UploadService);
    getProfile(req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        logo: string | null;
        status: string;
    }>;
    updateProfile(req: any, body: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        logo: string | null;
        status: string;
    }>;
    uploadLogo(req: any, file: Express.Multer.File): Promise<any>;
}

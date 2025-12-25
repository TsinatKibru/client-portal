import { Controller, Post, UseInterceptors, UploadedFile, Request, UseGuards, Param, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('upload')
@UseGuards(JwtAuthGuard)
export class UploadController {
    constructor(private uploadService: UploadService) { }

    @Post(':projectId')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Request() req,
        @Param('projectId') projectId: string,
    ) {
        return this.uploadService.uploadFile(file, req.user.businessId, projectId, req.user.userId);
    }

    @Delete(':projectId/delete/:fileId')
    async deleteFile(
        @Param('fileId') fileId: string,
        @Request() req,
    ) {
        console.log(`Deleting file ${fileId} for business ${req.user.businessId}`);
        return this.uploadService.deleteFile(fileId, req.user.businessId);
    }

    @Delete('delete-any/:fileId')
    async deleteFileAny(
        @Param('fileId') fileId: string,
        @Request() req,
    ) {
        console.log(`Deleting any file ${fileId} for business ${req.user.businessId}`);
        return this.uploadService.deleteFile(fileId, req.user.businessId);
    }
}

import { Controller, Post, UseInterceptors, UploadedFile, Request, UseGuards, Param } from '@nestjs/common';
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
        return this.uploadService.uploadFile(file, req.user.businessId, projectId);
    }
}

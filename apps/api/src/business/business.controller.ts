import { Body, Controller, Get, Patch, Post, Request, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from '../upload/upload.service';
import { BusinessService } from './business.service';

@Controller('business')
@UseGuards(JwtAuthGuard)
export class BusinessController {
    constructor(
        private businessService: BusinessService,
        private uploadService: UploadService,
    ) { }

    @Get('profile')
    async getProfile(@Request() req) {
        return this.businessService.findOne(req.user.businessId);
    }

    @Patch('profile')
    async updateProfile(@Request() req, @Body() body: any) {
        return this.businessService.update(req.user.businessId, body);
    }

    @Post('logo')
    @UseInterceptors(FileInterceptor('file'))
    async uploadLogo(@Request() req, @UploadedFile() file: Express.Multer.File) {
        // Specialized logo upload for branding
        const result: any = await this.uploadService.uploadFile(file, req.user.businessId, 'branding');
        // Update the business record with the new logo URL
        await this.businessService.update(req.user.businessId, { logo: result.url });
        return result;
    }
}

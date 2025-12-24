import { Body, Controller, Get, Patch, Request, UseGuards } from '@nestjs/common';
import { BusinessService } from './business.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('business')
@UseGuards(JwtAuthGuard)
export class BusinessController {
    constructor(private businessService: BusinessService) { }

    @Get('profile')
    async getProfile(@Request() req) {
        return this.businessService.findOne(req.user.businessId);
    }

    @Patch('profile')
    async updateProfile(@Request() req, @Body() body: any) {
        return this.businessService.update(req.user.businessId, body);
    }
}

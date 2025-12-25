import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ActivityService } from './activity.service';

@Controller('activities')
@UseGuards(JwtAuthGuard)
export class ActivityController {
    constructor(private activityService: ActivityService) { }

    @Get('business')
    async findAllByBusiness(@Request() req) {
        return this.activityService.findAllByBusiness(req.user.businessId);
    }

    @Get('project/:projectId')
    async findAll(@Param('projectId') projectId: string) {
        return this.activityService.findAll(projectId);
    }
}

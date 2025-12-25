import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ActivityService } from './activity.service';

@Controller('activities')
@UseGuards(JwtAuthGuard)
export class ActivityController {
    constructor(private activityService: ActivityService) { }

    @Get('project/:projectId')
    async findAll(@Param('projectId') projectId: string) {
        return this.activityService.findAll(projectId);
    }
}

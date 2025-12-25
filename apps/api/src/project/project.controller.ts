import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectController {
    constructor(private projectService: ProjectService) { }

    @Get()
    async findAll(@Request() req) {
        return this.projectService.findAll(req.user.businessId);
    }

    @Get('all/files')
    async findAllFiles(@Request() req) {
        return this.projectService.findAllFiles(req.user.businessId);
    }

    @Post()
    async create(@Request() req, @Body() body: any) {
        return this.projectService.create(req.user.businessId, body);
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Request() req) {
        return this.projectService.findOne(id, req.user.businessId);
    }

    @Patch(':id/status')
    async updateStatus(@Param('id') id: string, @Request() req, @Body() body: { status: string }) {
        return this.projectService.updateStatus(id, req.user.businessId, body.status as any, req.user.userId);
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @Request() req) {
        return this.projectService.delete(id, req.user.businessId);
    }
}

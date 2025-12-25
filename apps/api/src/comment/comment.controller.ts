import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CommentService } from './comment.service';

@Controller('comments')
@UseGuards(JwtAuthGuard)
export class CommentController {
    constructor(private commentService: CommentService) { }

    @Post()
    async create(@Request() req, @Body() body: { projectId: string; content: string; fileId?: string }) {
        return this.commentService.create(req.user.userId, body);
    }

    @Get('project/:projectId')
    async findAll(@Param('projectId') projectId: string) {
        return this.commentService.findAll(projectId);
    }
}

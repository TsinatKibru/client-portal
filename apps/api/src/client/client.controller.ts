import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('clients')
@UseGuards(JwtAuthGuard)
export class ClientController {
    constructor(private clientService: ClientService) { }

    @Get()
    async findAll(@Request() req) {
        return this.clientService.findAll(req.user.businessId);
    }

    @Post()
    async create(@Request() req, @Body() body: any) {
        return this.clientService.create(req.user.businessId, body);
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Request() req) {
        return this.clientService.findOne(id, req.user.businessId);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Request() req, @Body() body: any) {
        return this.clientService.update(id, req.user.businessId, body);
    }
}

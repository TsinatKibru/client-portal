import { Body, Controller, Get, Param, Patch, Post, Request, Res, UseGuards } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Response } from 'express';

@Controller('invoices')
@UseGuards(JwtAuthGuard)
export class InvoiceController {
    constructor(private invoiceService: InvoiceService) { }

    @Get()
    async findAll(@Request() req) {
        return this.invoiceService.findAll(req.user.businessId);
    }

    @Post()
    async create(@Request() req, @Body() body: any) {
        return this.invoiceService.create(req.user.businessId, body);
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Request() req) {
        return this.invoiceService.findOne(id, req.user.businessId);
    }

    @Patch(':id/status')
    async updateStatus(@Param('id') id: string, @Request() req, @Body() body: { status: string }) {
        return this.invoiceService.updateStatus(id, req.user.businessId, body.status);
    }

    @Get(':id/pdf')
    async downloadPdf(@Param('id') id: string, @Request() req, @Res() res: Response) {
        const buffer = await this.invoiceService.generatePdf(id, req.user.businessId);

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=invoice-${id}.pdf`,
            'Content-Length': buffer.length,
        });

        res.end(buffer);
    }
}

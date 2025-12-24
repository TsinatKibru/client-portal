import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { PortalService } from './portal.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('portal')
@UseGuards(JwtAuthGuard)
export class PortalController {
    constructor(private portalService: PortalService) { }

    @Get('projects')
    async getProjects(@Request() req) {
        return this.portalService.getClientProjects(req.user.userId);
    }

    @Get('invoices')
    async getInvoices(@Request() req) {
        return this.portalService.getClientInvoices(req.user.userId);
    }

}

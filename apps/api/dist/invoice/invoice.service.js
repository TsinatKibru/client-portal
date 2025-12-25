"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const PDFDocument = require("pdfkit");
let InvoiceService = class InvoiceService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(businessId) {
        return this.prisma.invoice.findMany({
            where: { businessId },
            include: { client: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async create(businessId, data) {
        const lineItems = data.lineItems || [];
        let subtotal = 0;
        let totalTax = 0;
        lineItems.forEach((item) => {
            const rowTotal = (item.quantity || 0) * (item.rate || 0);
            subtotal += rowTotal;
            totalTax += rowTotal * ((item.tax || 0) / 100);
        });
        const total = subtotal + totalTax;
        return this.prisma.invoice.create({
            data: {
                invoiceNumber: data.invoiceNumber,
                amount: total,
                subtotal,
                tax: totalTax,
                total,
                status: data.status || 'DRAFT',
                lineItems,
                businessId,
                clientId: data.clientId,
            },
        });
    }
    async findOne(id, businessId) {
        const invoice = await this.prisma.invoice.findFirst({
            where: { id, businessId },
            include: { client: true, business: true },
        });
        if (!invoice)
            throw new common_1.NotFoundException('Invoice not found');
        return invoice;
    }
    async updateStatus(id, businessId, status) {
        return this.prisma.invoice.updateMany({
            where: { id, businessId },
            data: { status },
        });
    }
    async generatePdf(id, businessId) {
        const invoice = await this.findOne(id, businessId);
        const business = invoice.business;
        const currency = business.currency || 'USD';
        const brandColor = business.brandColor || '#4F46E5';
        return new Promise((resolve, reject) => {
            const doc = new PDFDocument({ size: 'A4', margin: 50 });
            const chunks = [];
            doc.on('data', (chunk) => chunks.push(chunk));
            doc.on('end', () => resolve(Buffer.concat(chunks)));
            doc.on('error', (err) => reject(err));
            doc
                .fillColor(brandColor)
                .fontSize(20)
                .text(business.name.toUpperCase(), 50, 50)
                .fillColor('#444444')
                .fontSize(10)
                .text(business.address || '', 50, 75)
                .text(business.taxId ? `Tax ID: ${business.taxId}` : '', 50, 90)
                .moveDown();
            doc
                .fillColor('#444444')
                .fontSize(20)
                .text('INVOICE', 400, 50, { align: 'right' })
                .fontSize(10)
                .text(`Invoice #: ${invoice.invoiceNumber}`, 400, 75, { align: 'right' })
                .text(`Date: ${new Date(invoice.createdAt).toLocaleDateString()}`, 400, 90, { align: 'right' })
                .text(`Status: ${invoice.status}`, 400, 105, { align: 'right' });
            doc.moveTo(50, 130).lineTo(550, 130).stroke('#EEEEEE');
            doc
                .fontSize(12)
                .fillColor(brandColor)
                .text('BILL TO:', 50, 160)
                .fillColor('#444444')
                .fontSize(10)
                .text(invoice.client.name, 50, 175)
                .text(invoice.client.email, 50, 190)
                .moveDown();
            const tableTop = 250;
            doc.font('Helvetica-Bold');
            this.generateTableRow(doc, tableTop, 'Description', 'Qty', 'Rate', 'Tax', 'Total');
            this.generateHr(doc, tableTop + 20);
            doc.font('Helvetica');
            let i = 0;
            const lineItems = invoice.lineItems || [];
            lineItems.forEach((item, index) => {
                const y = tableTop + 30 + index * 25;
                const rowTotal = item.quantity * item.rate * (1 + (item.tax || 0) / 100);
                this.generateTableRow(doc, y, item.description, item.quantity.toString(), `${item.rate.toFixed(2)}`, `${item.tax}%`, `${rowTotal.toFixed(2)}`);
                this.generateHr(doc, y + 20);
                i++;
            });
            const summaryTop = tableTop + 30 + i * 25 + 20;
            doc
                .fontSize(10)
                .text('Subtotal:', 380, summaryTop)
                .text(`${currency} ${invoice.subtotal.toFixed(2)}`, 480, summaryTop, { align: 'right' })
                .text('Tax:', 380, summaryTop + 15)
                .text(`${currency} ${invoice.tax.toFixed(2)}`, 480, summaryTop + 15, { align: 'right' })
                .fontSize(12)
                .font('Helvetica-Bold')
                .fillColor(brandColor)
                .text('Total:', 380, summaryTop + 40)
                .text(`${currency} ${invoice.total.toFixed(2)}`, 480, summaryTop + 40, { align: 'right' });
            doc
                .fontSize(10)
                .fillColor('#999999')
                .font('Helvetica')
                .text('Thank you for your business!', 50, 750, { align: 'center', width: 500 });
            doc.end();
        });
    }
    generateTableRow(doc, y, desc, qty, rate, tax, total) {
        doc
            .fontSize(10)
            .text(desc, 50, y, { width: 200 })
            .text(qty, 250, y, { width: 50, align: 'right' })
            .text(rate, 300, y, { width: 80, align: 'right' })
            .text(tax, 380, y, { width: 50, align: 'right' })
            .text(total, 450, y, { width: 100, align: 'right' });
    }
    generateHr(doc, y) {
        doc
            .strokeColor('#EEEEEE')
            .lineWidth(1)
            .moveTo(50, y)
            .lineTo(550, y)
            .stroke();
    }
};
exports.InvoiceService = InvoiceService;
exports.InvoiceService = InvoiceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InvoiceService);
//# sourceMappingURL=invoice.service.js.map
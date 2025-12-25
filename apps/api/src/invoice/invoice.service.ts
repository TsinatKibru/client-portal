import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import PDFDocument from 'pdfkit';

@Injectable()
export class InvoiceService {
    constructor(private prisma: PrismaService) { }

    async findAll(businessId: string) {
        return this.prisma.invoice.findMany({
            where: { businessId },
            include: { client: true },
            orderBy: { createdAt: 'desc' },
        });
    }

    async create(businessId: string, data: any) {
        const lineItems = data.lineItems || [];
        let subtotal = 0;
        let totalTax = 0;

        lineItems.forEach((item: any) => {
            const rowTotal = (item.quantity || 0) * (item.rate || 0);
            subtotal += rowTotal;
            totalTax += rowTotal * ((item.tax || 0) / 100);
        });

        const total = subtotal + totalTax;

        return this.prisma.invoice.create({
            data: {
                invoiceNumber: data.invoiceNumber,
                amount: total, // For compatibility with old view
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

    async findOne(id: string, businessId: string) {
        const invoice = await this.prisma.invoice.findFirst({
            where: { id, businessId },
            include: { client: true, business: true },
        });
        if (!invoice) throw new NotFoundException('Invoice not found');
        return invoice;
    }

    async updateStatus(id: string, businessId: string, status: any) {
        return this.prisma.invoice.updateMany({
            where: { id, businessId },
            data: { status },
        });
    }

    async generatePdf(id: string, businessId: string): Promise<Buffer> {
        const invoice = await this.findOne(id, businessId);
        const business = invoice.business;
        const currency = (business as any).currency || 'USD';
        const brandColor = (business as any).brandColor || '#4F46E5';

        return new Promise((resolve, reject) => {
            const doc = new PDFDocument({ size: 'A4', margin: 50 });
            const chunks: Buffer[] = [];

            doc.on('data', (chunk) => chunks.push(chunk));
            doc.on('end', () => resolve(Buffer.concat(chunks)));
            doc.on('error', (err) => reject(err));

            // Header - Business Info
            doc
                .fillColor(brandColor)
                .fontSize(20)
                .text(business.name.toUpperCase(), 50, 50)
                .fillColor('#444444')
                .fontSize(10)
                .text((business as any).address || '', 50, 75)
                .text((business as any).taxId ? `Tax ID: ${(business as any).taxId}` : '', 50, 90)
                .moveDown();

            // Right side - Invoice Meta
            doc
                .fillColor('#444444')
                .fontSize(20)
                .text('INVOICE', 400, 50, { align: 'right' })
                .fontSize(10)
                .text(`Invoice #: ${invoice.invoiceNumber}`, 400, 75, { align: 'right' })
                .text(`Date: ${new Date(invoice.createdAt).toLocaleDateString()}`, 400, 90, { align: 'right' })
                .text(`Status: ${invoice.status}`, 400, 105, { align: 'right' });

            // Horizontal Line
            doc.moveTo(50, 130).lineTo(550, 130).stroke('#EEEEEE');

            // Client Info
            doc
                .fontSize(12)
                .fillColor(brandColor)
                .text('BILL TO:', 50, 160)
                .fillColor('#444444')
                .fontSize(10)
                .text(invoice.client.name, 50, 175)
                .text(invoice.client.email, 50, 190)
                .moveDown();

            // Items Table
            const tableTop = 250;
            doc.font('Helvetica-Bold');
            this.generateTableRow(doc, tableTop, 'Description', 'Qty', 'Rate', 'Tax', 'Total');
            this.generateHr(doc, tableTop + 20);
            doc.font('Helvetica');

            let i = 0;
            const lineItems = (invoice.lineItems as any[]) || [];
            lineItems.forEach((item, index) => {
                const y = tableTop + 30 + index * 25;
                const rowTotal = item.quantity * item.rate * (1 + (item.tax || 0) / 100);
                this.generateTableRow(
                    doc,
                    y,
                    item.description,
                    item.quantity.toString(),
                    `${item.rate.toFixed(2)}`,
                    `${item.tax}%`,
                    `${rowTotal.toFixed(2)}`
                );
                this.generateHr(doc, y + 20);
                i++;
            });

            // Summary
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

            // Footer
            doc
                .fontSize(10)
                .fillColor('#999999')
                .font('Helvetica')
                .text('Thank you for your business!', 50, 750, { align: 'center', width: 500 });

            doc.end();
        });
    }

    private generateTableRow(doc: any, y: number, desc: string, qty: string, rate: string, tax: string, total: string) {
        doc
            .fontSize(10)
            .text(desc, 50, y, { width: 200 })
            .text(qty, 250, y, { width: 50, align: 'right' })
            .text(rate, 300, y, { width: 80, align: 'right' })
            .text(tax, 380, y, { width: 50, align: 'right' })
            .text(total, 450, y, { width: 100, align: 'right' });
    }

    private generateHr(doc: any, y: number) {
        doc
            .strokeColor('#EEEEEE')
            .lineWidth(1)
            .moveTo(50, y)
            .lineTo(550, y)
            .stroke();
    }
}

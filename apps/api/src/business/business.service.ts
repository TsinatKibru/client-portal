import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BusinessService {
    constructor(private prisma: PrismaService) { }

    async findOne(id: String) {
        const business = await this.prisma.business.findUnique({
            where: { id: id.toString() },
        });
        if (!business) throw new NotFoundException('Business not found');
        return business;
    }

    async update(id: string, data: any) {
        return this.prisma.business.update({
            where: { id },
            data,
        });
    }
}

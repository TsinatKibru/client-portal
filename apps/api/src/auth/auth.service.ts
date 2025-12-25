import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async register(data: any) {
        // Check if email already exists
        const existingUser = await this.prisma.user.findUnique({
            where: { email: data.email },
        });

        if (existingUser) {
            throw new UnauthorizedException('Email already registered');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Generate unique slug
        let slug = data.businessName
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');

        // Check if slug exists and append random suffix if needed
        const existingBusiness = await this.prisma.business.findUnique({
            where: { slug },
        });

        if (existingBusiness) {
            const randomSuffix = Math.random().toString(36).substring(2, 6);
            slug = `${slug}-${randomSuffix}`;
        }

        // Create business and user together
        const business = await this.prisma.business.create({
            data: {
                name: data.businessName,
                slug,
                users: {
                    create: {
                        email: data.email,
                        password: hashedPassword,
                        role: 'OWNER',
                    },
                },
            },
            include: {
                users: true,
            },
        });

        const user = business.users[0];
        const payload = { sub: user.id, email: user.email, businessId: user.businessId };
        return {
            access_token: await this.jwtService.signAsync(payload),
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                businessId: user.businessId,
            },
        };
    }

    async login(data: any) {
        const user = await this.prisma.user.findUnique({
            where: { email: data.email },
        });

        if (!user || !(await bcrypt.compare(data.password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id, email: user.email, businessId: user.businessId };
        return {
            access_token: await this.jwtService.signAsync(payload),
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                businessId: user.businessId,
            },
        };
    }

    async changePassword(userId: string, data: any) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const isPasswordMatching = await bcrypt.compare(
            data.currentPassword,
            user.password,
        );

        if (!isPasswordMatching) {
            throw new UnauthorizedException('Invalid current password');
        }

        const hashedPassword = await bcrypt.hash(data.newPassword, 10);

        return this.prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });
    }
}

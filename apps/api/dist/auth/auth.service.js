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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async register(data) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: data.email },
        });
        if (existingUser) {
            throw new common_1.UnauthorizedException('Email already registered');
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        let slug = data.businessName
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
        const existingBusiness = await this.prisma.business.findUnique({
            where: { slug },
        });
        if (existingBusiness) {
            const randomSuffix = Math.random().toString(36).substring(2, 6);
            slug = `${slug}-${randomSuffix}`;
        }
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
    async login(data) {
        const user = await this.prisma.user.findUnique({
            where: { email: data.email },
        });
        if (!user || !(await bcrypt.compare(data.password, user.password))) {
            throw new common_1.UnauthorizedException('Invalid credentials');
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
    async changePassword(userId, data) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        const isPasswordMatching = await bcrypt.compare(data.currentPassword, user.password);
        if (!isPasswordMatching) {
            throw new common_1.UnauthorizedException('Invalid current password');
        }
        const hashedPassword = await bcrypt.hash(data.newPassword, 10);
        return this.prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
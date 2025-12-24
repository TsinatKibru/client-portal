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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const platform_express_1 = require("@nestjs/platform-express");
const upload_service_1 = require("../upload/upload.service");
const business_service_1 = require("./business.service");
let BusinessController = class BusinessController {
    businessService;
    uploadService;
    constructor(businessService, uploadService) {
        this.businessService = businessService;
        this.uploadService = uploadService;
    }
    async getProfile(req) {
        return this.businessService.findOne(req.user.businessId);
    }
    async updateProfile(req, body) {
        return this.businessService.update(req.user.businessId, body);
    }
    async uploadLogo(req, file) {
        const result = await this.uploadService.uploadFile(file, req.user.businessId, 'branding');
        await this.businessService.update(req.user.businessId, { logo: result.url });
        return result;
    }
};
exports.BusinessController = BusinessController;
__decorate([
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BusinessController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Patch)('profile'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BusinessController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Post)('logo'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BusinessController.prototype, "uploadLogo", null);
exports.BusinessController = BusinessController = __decorate([
    (0, common_1.Controller)('business'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [business_service_1.BusinessService,
        upload_service_1.UploadService])
], BusinessController);
//# sourceMappingURL=business.controller.js.map
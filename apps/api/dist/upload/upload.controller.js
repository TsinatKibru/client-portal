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
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const upload_service_1 = require("./upload.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let UploadController = class UploadController {
    uploadService;
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    async uploadFile(file, req, projectId) {
        return this.uploadService.uploadFile(file, req.user.businessId, projectId);
    }
    async deleteFile(fileId, req) {
        console.log(`Deleting file ${fileId} for business ${req.user.businessId}`);
        return this.uploadService.deleteFile(fileId, req.user.businessId);
    }
    async deleteFileAny(fileId, req) {
        console.log(`Deleting any file ${fileId} for business ${req.user.businessId}`);
        return this.uploadService.deleteFile(fileId, req.user.businessId);
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Post)(':projectId'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Delete)(':projectId/delete/:fileId'),
    __param(0, (0, common_1.Param)('fileId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "deleteFile", null);
__decorate([
    (0, common_1.Delete)('delete-any/:fileId'),
    __param(0, (0, common_1.Param)('fileId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "deleteFileAny", null);
exports.UploadController = UploadController = __decorate([
    (0, common_1.Controller)('upload'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], UploadController);
//# sourceMappingURL=upload.controller.js.map
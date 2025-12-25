import { Body, Controller, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() body: any) {
        return this.authService.register(body);
    }

    @Post('login')
    async login(@Body() body: any) {
        return this.authService.login(body);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('change-password')
    async changePassword(@Request() req, @Body() body: any) {
        return this.authService.changePassword(req.user.userId, body);
    }
}

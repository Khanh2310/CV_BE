import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { Public } from '../customize';
import { AuthService } from '../services';
import { JwtAuthGuard, LocalAuthGuard } from '../guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async handleAuth(@Request() req) {
    return this.authService.login(req.user);
  }

  // @Public()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

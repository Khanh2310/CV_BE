import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Public, User } from '../decorator';
import { AuthService } from '../services';
import { JwtAuthGuard, LocalAuthGuard } from '../guards';
import { RegisterUserDto } from 'src/users/dto';
import { IUser } from 'src/users/types';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public() // Không muốn check token thì thêm Public
  @Post('/register')
  handleRegister(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async handleAuth(@Req() req, @Res({ passthrough: true }) response: Response) {
    return await this.authService.login(req.user, response);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.coo;
  }

  @Get('/account')
  handleAccount(@User() user: IUser) {
    return { user };
  }

  @Public()
  @Get('/refresh')
  handleRefreshToken(
    @Req() req,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = req.cookies['refresh_token'];
    return this.authService.processRefreshToken(refreshToken, response);
  }
}

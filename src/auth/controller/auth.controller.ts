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
import { RolesService } from '../../roles/services/roles.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private rolesService: RolesService) { }

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
    return req.user;
  }

  @Get('/account')
  async handleAccount(@User() user: IUser) {
    const temp = await this.rolesService.findOne(user.role._id) as any;
    user.permissions = temp.permissions;
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

  @Post('/logout')
  handleLogout(
    @Res({ passthrough: true }) response: Response,
    @User() user: IUser,
  ) {
    return this.authService.logout(response, user);
  }
}

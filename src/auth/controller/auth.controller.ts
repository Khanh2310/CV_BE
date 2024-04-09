import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Public } from '../decorator';
import { AuthService } from '../services';
import { JwtAuthGuard, LocalAuthGuard } from '../guards';
import { RegisterUserDto } from 'src/users/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async handleAuth(@Request() req) {
    return await this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public() // Không muốn check token thì thêm Public
  @Post('/register')
  handleRegister(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }
}

import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LoginUserDto } from './dtos/login-user.dto';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { JwtGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() { email, password }: LoginUserDto) {
    return this.authService.login(email, password);
  }

  @Post('register')
  register(@Body() { firstName, lastName, email, password }: RegisterUserDto) {
    return this.authService.register(firstName, lastName, email, password);
  }

  @UseGuards(JwtGuard)
  @Get('me')
  getProfile(@Request() request) {
    return this.authService.getProfile(request);
  }
}

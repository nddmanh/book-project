import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.loginWithCredentials(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user-info')
  getUserInfo(@Request() req) {
    return req.user;
  }
}

import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { LogInDto } from './dto/LoginDto';
import { SignUpDto } from './dto/SignUpDto';
import { AuthService } from './Auth.Service';
import { LocalAuthGuard } from './guards/LocalAuth.Guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/JwtAuth.Guard';
import { CurrentUser } from '../../lib/decorators/CurrentUser.Decorator';
import { User } from '../user/entities/User.Entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LogInDto })
  async login(@Req() req: any) {
    const token = await this.authService.login(req.user);
    return token;
  }

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('test')
  test(@CurrentUser() user: number) {
    return 'sup';
  }
}

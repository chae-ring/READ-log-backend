import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto, SignupDto } from '../dto/auth.dto';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 회원가입 처리
  @Post('signup')
  @ApiOperation({ summary: 'User signup' })
  async signup(@Body() signupDto: SignupDto, @Res() res: Response) {
    try {
      const result = await this.authService.signup(signupDto);
      // 성공 시 201 상태 코드로 응답
      return res.status(HttpStatus.CREATED).json({
        message: result.message,
        userId: result.userId,
      });
    } catch (error) {
      // 오류 발생 시 400 상태 코드로 응답
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Signup failed',
        error: error.message,
      });
    }
  }

  // 로그인 처리
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    try {
      const result = await this.authService.login(loginDto);
      // 로그인 성공 시 200 상태 코드로 응답
      return res.status(HttpStatus.OK).json({
        message: result.message,
        accessToken: result.accessToken,
      });
    } catch (error) {
      // 로그인 실패 시 401 상태 코드로 응답
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: error.message, // 예: 'Invalid credentials'
        error: error.message,
      });
    }
  }
}

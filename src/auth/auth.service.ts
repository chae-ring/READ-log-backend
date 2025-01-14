import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignupDto, LoginDto } from '../dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { email, password, nickname } = signupDto;
    console.log('Password received:', password); // 비밀번호 값 출력
    console.log('email received:', email); // 비밀번호 값 출력
    console.log('name received:', nickname); // 비밀번호 값 출력
    // password 값이 정상적으로 전달되는지 확인
    if (!password) {
      throw new Error('Password cannot be empty');
    }

    const salt = await bcrypt.genSalt(10); // salt 생성
    const hashedPassword = await bcrypt.hash(password, salt); // 비밀번호 해싱

    const user = await this.prisma.user.create({
      data: { email, password: hashedPassword, nickname },
    });

    return { message: 'Signup successful', userId: user.id };
  }

  // 로그인
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({
      sub: user.id,
      nickname: user.nickname,
    });
    await this.prisma.token.upsert({
      where: { userId: user.id }, // userId로 찾기
      update: { token }, // 토큰 업데이트
      create: { userId: user.id, token }, // 새로 토큰 생성
    });

    return { message: 'Login successful', accessToken: token };
  }
}

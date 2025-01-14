import { Module } from '@nestjs/common';
import { MypageService } from './mypage.service';
import { MypageController } from './mypage.controller';
import { BearerGuard } from '../bearer.guard'; // BearerGuard 임포트
import { JwtModule } from '@nestjs/jwt'; // JwtModule 임포트

@Module({
  imports: [JwtModule.register({ secret: 'your-secret-key' })], // JwtModule 등록
  providers: [MypageService, BearerGuard],
  controllers: [MypageController],
})
export class MypageModule {}

import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt'; // JwtModule 임포트
import { BearerGuard } from '../bearer.guard'; // BearerGuard 임포트

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '60s' },
    }),
  ], // JwtModule을 UsersModule에 추가하여 JwtService를 사용 가능하게 합니다.
  controllers: [UsersController],
  providers: [UsersService, BearerGuard],
})
export class UsersModule {}

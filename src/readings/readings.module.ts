import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'; // JwtModule 임포트
import { ReadingsController } from './readings.controller';
import { ReadingsService } from './readings.service';
import { BearerGuard } from '../bearer.guard'; // BearerGuard 임포트

@Module({
  imports: [JwtModule.register({ secret: 'your-secret-key' })], // JwtModule 등록
  controllers: [ReadingsController],
  providers: [ReadingsService, BearerGuard],
})
export class ReadingsModule {}

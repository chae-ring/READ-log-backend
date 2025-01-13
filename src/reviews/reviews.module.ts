import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'; // JwtModule 임포트
import { BearerGuard } from '../bearer.guard'; // BearerGuard 임포트
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

@Module({
  imports: [JwtModule.register({ secret: 'your-secret-key' })], // JwtModule 등록
  controllers: [ReviewsController],
  providers: [ReviewsService, BearerGuard],
})
export class ReviewsModule {}

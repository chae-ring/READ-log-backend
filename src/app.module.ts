import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma.module';
import { UsersModule } from './users/users.module';
import { ReadingsModule } from './readings/readings.module';
import { AuthModule } from './auth/auth.module';
import { ReviewsModule } from './reviews/reviews.module';
import { MypageModule } from './mypage/mypage.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    ReadingsModule,
    ReviewsModule,
    AuthModule,
    MypageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

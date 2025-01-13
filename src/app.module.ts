import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma.module';
import { UsersModule } from './users/users.module';
import { ReadingsModule } from './readings/readings.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    ReadingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';
import { PrismaService } from './prisma.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 설정 추가: 모든 도메인 및 모든 메서드 허용
  app.enableCors({
    origin: '*', // 모든 도메인 허용
    methods: '*', // 모든 HTTP 메서드 허용
    allowedHeaders: 'Content-Type, Authorization', // 허용할 헤더
  });

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  app.useGlobalPipes(new ValidationPipe());

  setupSwagger(app); // Swagger 문서를 생성

  await app.listen(3000); // 포트 3000에서 HTTP 요청을 수신하도록 설정
}
bootstrap();

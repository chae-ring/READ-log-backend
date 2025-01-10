import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app); //Swagger 문서를 생성
  await app.listen(3000); //포트 3000에서 HTTP 요청을 수신하도록 설정
}
bootstrap();

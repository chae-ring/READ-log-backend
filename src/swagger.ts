import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { ConfigService } from '@nestjs/config';

export function setupSwagger(app: INestApplication) {
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder() //Swagger 설정
    .setTitle('API Docs')
    .setDescription('API documentation with authentication')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  //Basic Auth 설정
  app.use(
    '/api-docs',
    basicAuth({
      users: {
        [configService.get('SWAGGER_USERNAME')]:
          configService.get('SWAGGER_PASSWORD'),
      },
      challenge: true, //인증창
    }),
  );

  //Swagger UI 설정
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });
}

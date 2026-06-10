import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { createAppLogger } from './common/logger/logger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: createAppLogger() });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  const doc = new DocumentBuilder().setTitle('手作教程与材料商城 API').setVersion('1.0.0').addBearerAuth().build();
  SwaggerModule.setup('api/docs', app, SwaggerModule.createDocument(app, doc));
  await app.listen(3000);
}

void bootstrap();

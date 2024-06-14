import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './todos/interceptors/logging-interceptors';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());
  const config = new DocumentBuilder()
    .setTitle('Todos API')
    .setDescription('Todos API documentation nestjs')
    .setVersion('1.0')
    .addTag('Todos', 'Todos')
    .addServer('http://test:4000/', 'test server')
    .addServer('http://localhost:4000', 'develop server')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();

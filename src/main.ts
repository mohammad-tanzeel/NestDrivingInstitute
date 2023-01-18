import 'dotenv/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';
import 'dotenv/config';
import cors from 'cors';


async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.use(cors())

  const config = new DocumentBuilder()
    .setTitle('Driving Institute')
    .setDescription('Driving Institute')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  
  await app.listen(3003);
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

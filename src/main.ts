import path from 'path';

import express from 'express';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import config from 'config';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';

import { AppModule } from './modules/app/app.module';
import { initializeSwagger } from './docs/swagger.doc';

interface IApp {
  baseUrl: string;
  port: number;
}

const { baseUrl, port } = config.get<IApp>('app');

async function bootstrap() {
  const logger = new ConsoleLogger();

  const _express = express();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(_express),
    {
      cors: true,
    },
  );

  app.setGlobalPrefix(baseUrl);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.useStaticAssets(path.join(__dirname, '/../public'));

  initializeSwagger(app);

  await app.init();
  await app
    .listen(port)
    .then(() =>
      logger.log(`[Main] App running at http://localhost:${port}${baseUrl}`),
    );
}

bootstrap();

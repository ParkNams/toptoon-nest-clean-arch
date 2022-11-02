import { NestFactory } from '@nestjs/core';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { AppModule } from './main/modules/app.module';
import * as requestIp from 'request-ip';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidV4 } from 'uuid';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(compression());
  app.use(cookieParser());
  app.use(requestIp.mw());
  app.use((req: Request, _res: Response, next: NextFunction) => {
    req.uuid = uuidV4();
    next();
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();

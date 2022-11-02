import { Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from '../routers/app.controller';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ConsoleUserAccessTokenHandlerModule } from '../../application/handler/consoleUserAccessToken/consoleUserAccessTokenHandler.module';
import { AdminValidationMiddleware } from '../middleware/adminValidation.middleware';
import { XrayProxyModule } from '@Src/proxy/aws-proxy/xrayProxy.module';
import { NextFunction, Request, Response } from 'express';
import { AwsProxy } from '@Src/proxy/aws-proxy/aws.proxy';
import { XrayOpenSegmentUC } from '@Src/application/usecases/aws/xray/xrayOpenSegment';
import { Adaptor } from '../adaptors/adaptor';
import { xrayOpenSegmentHandler } from '@Src/application/handler/aws/xray.handler';
import { AwsHandler } from '@Src/application/handler/aws/awsHandler.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ConsoleUserAccessTokenHandlerModule,
    XrayProxyModule.register(),
    AuthModule,
    RouterModule.register([
      {
        path: 'api',
        module: AppModule,
        children: [{ path: 'auth', module: AuthModule }],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [Adaptor, AwsHandler],
})
export class AppModule implements NestModule {
  constructor(
    private readonly adaptor: Adaptor,
    private readonly xrayOpenSegment: xrayOpenSegmentHandler,
  ) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req: Request, res: Response, next: NextFunction) => {
        this.adaptor.adapt(this.xrayOpenSegment, null)(req, res, next);
      }, AdminValidationMiddleware)
      .forRoutes('/');
  }
}

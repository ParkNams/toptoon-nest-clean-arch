import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from '../routers/app.controller';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ConsoleUserAccessTokenHandlerModule } from '../../application/handler/consoleUserAccessToken/consoleUserAccessTokenHandler.module';
import { AdminValidationMiddleware } from '../middleware/adminValidation.middleware';
import { XrayProxyModule } from '@Src/proxy/aws-proxy/xrayProxy.module';
import { NextFunction, Request, Response } from 'express';
import { Adaptor } from '../adaptors/adaptor';
import { xrayOpenSegmentHandler } from '@Src/application/handler/aws/xray.handler';
import { AwsHandlerModule } from '@Src/application/handler/aws/awsHandler.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ConsoleUserAccessTokenHandlerModule,
    XrayProxyModule.register(),
    AuthModule,
    AwsHandlerModule,
    RouterModule.register([
      {
        path: 'api',
        module: AppModule,
        children: [{ path: 'auth', module: AuthModule }],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [Adaptor],
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

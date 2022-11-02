import { Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from '../routers/app.controller';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ConsoleUserAccessTokenHandlerModule } from '../handler/consoleUserAccessToken/consoleUserAccessTokenHandler.module';
import { AdminValidationMiddleware } from '../middleware/adminValidation.middleware';
import { XrayProxyModule } from '@Src/proxy/aws-proxy/xrayProxy.module';
import { NextFunction, Request, Response } from 'express';
import { XrayTool } from '@Src/infra/aws/xray/xray.tool';
import { AwsProxy } from '@Src/proxy/aws-proxy/aws.proxy';
import { XrayOpenSegmentUC } from '@Src/application/usecases/aws/xray/xrayOpenSegment';
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
  providers: [],
})
export class AppModule implements NestModule {
  constructor(
    @Inject(XrayProxyModule.XRAY_OPEN_SEGMENT_PROXY)
    private readonly openSegment: AwsProxy<XrayOpenSegmentUC>,
  ) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req: Request, res: Response, next: NextFunction) => {
        this.openSegment.getInstance().execute()(req, res, next);
      }, AdminValidationMiddleware)
      .forRoutes('/');
  }
}

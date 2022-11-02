import {
  Injectable,
  MiddlewareConsumer,
  Module,
  NestMiddleware,
  NestModule,
} from '@nestjs/common';
import * as AWSXRay from 'aws-xray-sdk';
import { NextFunction, Request, Response } from 'express';
import { XrayTool } from './xray.tool';

@Injectable()
class XrayInitMiddleware implements NestMiddleware {
  use(_req: Request, _res: Response, next: NextFunction) {
    AWSXRay.config([AWSXRay.plugins.ECSPlugin]);
    AWSXRay.middleware.setSamplingRules('xray-sampling-rules.json');
    AWSXRay.setDaemonAddress('127.0.0.1:2000');
    AWSXRay.setStreamingThreshold(0);
    AWSXRay.setContextMissingStrategy('LOG_ERROR');
    next();
  }
}

@Module({
  providers: [XrayTool],
  exports: [XrayTool],
})
export class XrayModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(XrayInitMiddleware);
  }
}

import { Module } from '@nestjs/common';
import { XrayProxyModule } from '@Src/proxy/aws-proxy/xrayProxy.module';
import {
  SetXrayAnnotationHandler,
  xrayOpenSegmentHandler,
} from './xray.handler';

@Module({
  imports: [XrayProxyModule.register()],
  providers: [xrayOpenSegmentHandler, SetXrayAnnotationHandler],
  exports: [xrayOpenSegmentHandler, SetXrayAnnotationHandler],
})
export class AwsHandlerModule {}

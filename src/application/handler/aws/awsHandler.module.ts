import { Module } from '@nestjs/common';
import { XrayProxyModule } from '@Src/proxy/aws-proxy/xrayProxy.module';
import { xrayOpenSegmentHandler } from './xray.handler';

@Module({
  imports: [XrayProxyModule.register()],
  providers: [xrayOpenSegmentHandler],
  exports: [xrayOpenSegmentHandler],
})
export class AwsHandler {}

import { Module } from '@nestjs/common';
import { SetXrayAnnotationUC } from '@Src/application/usecases/aws/xray/setXrayAnnotation';
import { XrayOpenSegmentUC } from '@Src/application/usecases/aws/xray/xrayOpenSegment';
import { XrayModule } from '@Src/infra/aws/xray/xray.module';
import { XrayTool } from '@Src/infra/aws/xray/xray.tool';
import { AwsProxy } from './aws.proxy';

@Module({
  imports: [XrayModule],
})
export class XrayProxyModule {
  static XRAY_OPEN_SEGMENT_PROXY = 'xrayOpenSegmentProxy';
  static SET_XRAY_ANNOTATION_PROXY = 'setXrayAnnotationProxy';
  static register() {
    return {
      module: XrayProxyModule,
      providers: [
        {
          inject: [XrayTool],
          provide: XrayProxyModule.XRAY_OPEN_SEGMENT_PROXY,
          useFactory: (tool: XrayTool) =>
            new AwsProxy(new XrayOpenSegmentUC(tool)),
        },
        {
          inject: [XrayTool],
          provide: XrayProxyModule.SET_XRAY_ANNOTATION_PROXY,
          useFactory: (tool: XrayTool) =>
            new AwsProxy(new SetXrayAnnotationUC(tool)),
        },
      ],
      exports: [
        XrayProxyModule.XRAY_OPEN_SEGMENT_PROXY,
        XrayProxyModule.SET_XRAY_ANNOTATION_PROXY,
      ],
    };
  }
}

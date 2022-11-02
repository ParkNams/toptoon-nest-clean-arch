import { Inject, Injectable } from '@nestjs/common';
import { SetXrayAnnotationUC } from '@Src/application/usecases/aws/xray/setXrayAnnotation';
import { XrayOpenSegmentUC } from '@Src/application/usecases/aws/xray/xrayOpenSegment';
import { AwsProxy } from '@Src/proxy/aws-proxy/aws.proxy';
import { XrayProxyModule } from '@Src/proxy/aws-proxy/xrayProxy.module';
import { Request, RequestHandler } from 'express';
import { Handler } from '../handler';

@Injectable()
export class xrayOpenSegmentHandler extends Handler<RequestHandler> {
  constructor(
    @Inject(XrayProxyModule.XRAY_OPEN_SEGMENT_PROXY)
    private readonly proxy: AwsProxy<XrayOpenSegmentUC>,
  ) {
    super();
  }

  perform(_input: undefined | null) {
    return this.proxy.getInstance().execute();
  }
}

@Injectable()
export class SetXrayAnnotationHandler extends Handler<void> {
  constructor(
    @Inject(XrayProxyModule.SET_XRAY_ANNOTATION_PROXY)
    private readonly proxy: AwsProxy<SetXrayAnnotationUC>,
  ) {
    super();
  }

  perform(input: SetXrayAnnotationHandlerData['Input']) {
    const { req, keys } = input;
    return this.proxy.getInstance().execute(req, keys);
  }
}

interface SetXrayAnnotationHandlerData {
  Input: { req: Request; keys: string[] };
}

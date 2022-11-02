import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import * as _ from 'lodash';
import * as AWSXRay from 'aws-xray-sdk';

@Injectable()
export class XrayTool {
  public setXrayAnnotationByRequest(req: Request, keys: string[]) {
    const xraySeg = AWSXRay.getSegment();
    _.forEach(keys, (key: string) => {
      xraySeg.addAnnotation(
        key,
        _.isString(req[key]) ? req[key] : JSON.stringify(req[key]),
      );
    });
  }
  public setXrayError = (err: any) => {
    const xraySeg = AWSXRay.getSegment();
    xraySeg.addError(err);
  };
  public openSegment = () => {
    return AWSXRay.express.openSegment(
      `global-${process.env.ENVIRONMENT}-admin-backend`,
    );
  };
  public closeSegment = () => {
    return AWSXRay.express.closeSegment();
  };
}

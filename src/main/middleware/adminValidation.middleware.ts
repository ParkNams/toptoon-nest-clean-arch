import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { SetXrayAnnotationUC } from '@Src/application/usecases/aws/xray/setXrayAnnotation';
import { ValidateAccessTokenData } from '@Src/domain/interface/repositories/consoleUserAccessToken';
import { AwsProxy } from '@Src/proxy/aws-proxy/aws.proxy';
import { XrayProxyModule } from '@Src/proxy/aws-proxy/xrayProxy.module';
import { NextFunction, Request, Response } from 'express';
import { ValidateAccessTokenHandler } from '../handler/consoleUserAccessToken/consoleUserAccessToken.handler';

@Injectable()
export class AdminValidationMiddleware implements NestMiddleware {
  constructor(
    private readonly validateAccessTokenHandler: ValidateAccessTokenHandler,
    @Inject(XrayProxyModule.SET_XRAY_ANNOTATION_PROXY)
    private readonly setAnnotation: AwsProxy<SetXrayAnnotationUC>,
  ) {}
  use(req: Request, res: Response, next: NextFunction) {
    const { accesstoken } = req.headers;
    if (!accesstoken)
      return res.status(400).send({ message: 'accessToken not exist' });
    this.validateAccessTokenHandler.handle(
      accesstoken,
      (
        err: Error | undefined,
        result: ValidateAccessTokenData['Output'] | undefined,
      ) => {
        if (err) {
          return res.status(400).send({ message: err.toString() });
        }
        const { validationResult, profile } = result;

        if (!validationResult)
          return res
            .status(400)
            .send({ message: 'validate accessToken failed' });
        req.consoleProfile = profile;
        this.setAnnotation.getInstance().execute(req, ['consoleProfile']);
        return next();
      },
    );
  }
}

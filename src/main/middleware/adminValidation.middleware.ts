import { Injectable, NestMiddleware } from '@nestjs/common';
import { SetXrayAnnotationHandler } from '@Src/application/handler/aws/xray.handler';
import { ValidateAccessTokenData } from '@Src/domain/interface/repositories/consoleUserAccessToken';
import { NextFunction, Request, Response } from 'express';
import { ValidateAccessTokenHandler } from '../../application/handler/consoleUserAccessToken/consoleUserAccessToken.handler';
import { Adaptor } from '../adaptors/adaptor';

@Injectable()
export class AdminValidationMiddleware implements NestMiddleware {
  constructor(
    private readonly validateAccessTokenHandler: ValidateAccessTokenHandler,
    private readonly adaptor: Adaptor,
    private readonly setXrayAnnotation: SetXrayAnnotationHandler,
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
        this.adaptor.adapt(this.setXrayAnnotation, {
          req,
          keys: ['consoleProfile'],
        });
        return next();
      },
    );
  }
}

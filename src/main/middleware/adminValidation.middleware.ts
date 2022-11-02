import { Injectable, NestMiddleware } from '@nestjs/common';
import { ValidateAccessTokenData } from '@Src/domain/repositories/consoleUserAccessToken';
import { NextFunction, Request, Response } from 'express';
import { ValidateAccessTokenHandler } from '../handler/consoleUserAccessToken/consoleUserAccessToken.handler';

@Injectable()
export class AdminValidationMiddleware implements NestMiddleware {
  constructor(
    private readonly validateAccessTokenHandler: ValidateAccessTokenHandler,
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
        return next();
      },
    );
  }
}

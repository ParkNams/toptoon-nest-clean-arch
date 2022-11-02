import { CallbackHandler, Handler } from '@Src/application/handler/handler';
import * as express from 'express';
import { Injectable } from '@nestjs/common';
import { clientError, success } from '@Src/application/helper/response';

@Injectable()
export class HttpAdaptor {
  adapt(
    handler: CallbackHandler<any>,
  ): (param: any, res: express.Response) => void {
    return (param, res) => {
      handler.handle(param, (err, result) => {
        if (err) {
          return clientError(err, res);
        }
        return success(result, res);
      });
    };
  }
}

@Injectable()
export class Adaptor {
  adapt(handler: Handler<any>, input: any): any {
    return handler.handle(input);
  }
}

import { Handler } from '@Src/main/handler/handler';
import * as express from 'express';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Adaptor {
  adapt(handler: Handler): (param: any, res: express.Response) => void {
    return (param, res) => {
      handler.handle(param, (err, result) => {
        if (err) {
          console.log(err);
          const { statusCode, error } = result;
          return res.status(statusCode).json({ error });
        }
        const { statusCode, data } = result;
        return res.status(statusCode).json({ data });
      });
    };
  }
}

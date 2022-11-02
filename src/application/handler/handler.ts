import { ICallback } from 'src/domain/type/common.interface';
import { HttpResponse } from '../helper/response';

export abstract class CallbackHandler<T> {
  abstract perform(input: any, callback: ICallback<T>);

  handle(input: any, callback: ICallback<T>) {
    this.perform(input, (err, data) => {
      if (err) {
        return callback(err, data);
      }
      return callback(null, data);
    });
  }
}

export interface HandlerData {
  ResponseData: HttpResponse;
  Data: any;
}

export abstract class Handler<T> {
  abstract perform(input: any);

  handle(input: any): T {
    return this.perform(input);
  }
}

import { ICallback } from 'src/domain/type/common.interface';
import { HttpResponse } from '../../application/helper/response';

export abstract class Handler {
  abstract perform(input: any, callback: ICallback<HttpResponse> | any);

  handle(input: any, callback: ICallback<Handler['Output']>) {
    this.perform(input, (err, data) => {
      if (err) {
        return callback(err, data);
      }
      return callback(null, data);
    });
  }
}

export interface Handler {
  Output: HttpResponse | any;
}

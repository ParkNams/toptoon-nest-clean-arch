import { IError } from 'src/domain/type/common.interface';

export interface HttpResponse<T = any> {
  statusCode: number;
  data?: T;
  error?: T;
}

export const success = <T = any>(data: T): HttpResponse<T> => {
  return {
    statusCode: 200,
    data,
  };
};

export const serverError = (
  error: Error | string,
): HttpResponse<Error | string> => {
  return {
    statusCode: 500,
    error,
  };
};

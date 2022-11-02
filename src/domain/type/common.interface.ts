export interface ICallback<T = any> {
  (err?: IError['err'], data?: T): any;
}

export interface IError {
  err?: Error | string | undefined | null;
}

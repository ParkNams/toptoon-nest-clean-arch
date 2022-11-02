import { ErrorRequestHandler, Request, RequestHandler } from 'express';

export interface XrayToolInterface {
  setXrayAnnotationByRequest(req: Request, keys: string[]);
  setXrayError(err: any);
  openSegment: () => RequestHandler;
  closeSegment: () => ErrorRequestHandler;
}

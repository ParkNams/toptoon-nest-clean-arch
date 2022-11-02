import { Response } from 'express';

export interface HttpResponse<T = any> {
  statusCode: number;
  data?: T;
  error?: T;
}

export const success = <T = any>(data: T, res: Response): any => {
  res.status(200).send({ data });
};

export const serverError = (error: Error | string, res: Response): any => {
  res.status(500).send({ error });
};

export const clientError = (error: Error | string, res: Response): any => {
  res.status(400).send({ error });
};

export const customError = (
  error: Error | string,
  res: Response,
  status = 400,
): any => {
  res.status(status).send({ error });
};

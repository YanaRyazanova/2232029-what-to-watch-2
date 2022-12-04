import {NextFunction, Request, Response} from 'express';
import {HttpMethod} from './http-method.js';

export interface IRoute {
  path: string;
  method: HttpMethod;
  handler: (req: Request, res: Response, next: NextFunction) => void;
}
import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .json({ message: statusCode === 500 ? 'Ошибка на сервере' : message });
};

export default errorHandler;

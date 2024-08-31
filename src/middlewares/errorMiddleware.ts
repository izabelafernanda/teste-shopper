import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({
    error_code: err.code || 'INTERNAL_SERVER_ERROR',
    error_description: message,
  });
};

export default errorMiddleware;

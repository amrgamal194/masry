import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

/**
 * Generate and attach request ID to each request
 */
export const requestId = (req: Request, res: Response, next: NextFunction): void => {
  req.id = (req.headers['x-request-id'] as string) || randomUUID();
  res.setHeader('X-Request-ID', req.id!);
  next();
};


import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger.js';

/**
 * Request logging middleware
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const startTime = Date.now();

  // Log request start
  logger.debug('Request started', {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    requestId: req.id,
  });

  // Override res.end to log response
  const originalEnd = res.end.bind(res);
  res.end = function (chunk?: any, encoding?: any): Response {
    const responseTime = Date.now() - startTime;
    logger.request(req, res, responseTime);
    return originalEnd(chunk, encoding);
  };

  next();
};


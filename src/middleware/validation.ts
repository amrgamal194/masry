import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ValidationError } from '../errors/ErrorTypes.js';
import { ValidationError as ValidationErrorType } from '../types/index.js';

// Validation middleware
export const validate = (req: Request, _res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages: ValidationErrorType[] = errors.array().map((error) => {
      const field = 'path' in error ? error.path : ('param' in error ? error.param : 'unknown');
      return {
        field: String(field),
        message: error.msg,
        value: 'value' in error ? error.value : undefined,
      };
    });
    return next(new ValidationError('Validation failed', errorMessages));
  }
  next();
};


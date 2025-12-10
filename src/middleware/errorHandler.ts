import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/AppError.js';
import {
  BadRequestError,
  UnauthorizedError,
  ConflictError,
  ValidationError,
  InternalServerError,
} from '../errors/ErrorTypes.js';
import config from '../config/env.js';
import logger from '../utils/logger.js';
import { HTTP_STATUS } from '../constants/index.js';
import { ValidationError as ValidationErrorType } from '../types/index.js';

interface MongooseError extends Error {
  path?: string;
  value?: any;
  errmsg?: string;
  code?: number;
  errors?: Record<string, { path: string; message: string }>;
}

// Handle cast errors (invalid MongoDB ObjectId)
const handleCastErrorDB = (err: MongooseError): BadRequestError => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new BadRequestError(message);
};

// Handle duplicate field errors
const handleDuplicateFieldsDB = (err: MongooseError): ConflictError => {
  const value = err.errmsg?.match(/(["'])(\\?.)*?\1/)?.[0] || 'value';
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new ConflictError(message);
};

// Handle validation errors
const handleValidationErrorDB = (err: MongooseError): ValidationError => {
  const errors: ValidationErrorType[] = Object.values(err.errors || {}).map((el: any) => ({
    field: el.path,
    message: el.message,
  }));
  const message = 'Validation failed';
  return new ValidationError(message, errors);
};

// Handle JWT errors
const handleJWTError = (): UnauthorizedError => 
  new UnauthorizedError('Invalid token. Please log in again!');

const handleJWTExpiredError = (): UnauthorizedError =>
  new UnauthorizedError('Your token has expired! Please log in again.');

// Handle Mongoose errors
const handleMongooseError = (err: MongooseError): AppError | null => {
  if (err.name === 'CastError') return handleCastErrorDB(err);
  if (err.code === 11000) return handleDuplicateFieldsDB(err);
  if (err.name === 'ValidationError') return handleValidationErrorDB(err);
  return null;
};

// Send error response in development
const sendErrorDev = (err: AppError, req: Request, res: Response): void => {
  logger.error('Error occurred', err, {
    requestId: req.id,
    url: req.originalUrl,
    method: req.method,
  });

  res.status(err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    error: {
      name: err.name,
      message: err.message,
      statusCode: err.statusCode,
      status: err.status,
      stack: err.stack,
      errors: (err as any).errors,
    },
    requestId: req.id,
    timestamp: new Date().toISOString(),
  });
};

// Send error response in production
const sendErrorProd = (err: AppError, req: Request, res: Response): void => {
  // Log error
  if (err.isOperational) {
    logger.warn('Operational error', {
      message: err.message,
      statusCode: err.statusCode,
      requestId: req.id,
    });
  } else {
    logger.error('Programming error', err, {
      requestId: req.id,
      url: req.originalUrl,
      method: req.method,
    });
  }

  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message,
      ...((err as any).errors && { errors: (err as any).errors }),
      requestId: req.id,
      timestamp: new Date().toISOString(),
    });
  } else {
    // Programming or other unknown error: don't leak error details
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Something went wrong!',
      requestId: req.id,
      timestamp: new Date().toISOString(),
    });
  }
};

// Global error handling middleware
export default (err: Error, req: Request, res: Response, _next: NextFunction): void => {
  let error: AppError = err as AppError;
  
  if (!(error instanceof AppError)) {
    error = new InternalServerError(err.message);
  }

  error.statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  error.status = error.status || 'error';

  // Handle specific error types
  if (error.name === 'CastError') error = handleCastErrorDB(error as any);
  if ((error as any).code === 11000) error = handleDuplicateFieldsDB(error as any);
  if (error.name === 'ValidationError') error = handleValidationErrorDB(error as any);
  if (error.name === 'JsonWebTokenError') error = handleJWTError();
  if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

  // Handle Mongoose errors
  const mongooseError = handleMongooseError(error as any);
  if (mongooseError) error = mongooseError;

  if (config.nodeEnv === 'development') {
    sendErrorDev(error, req, res);
  } else {
    sendErrorProd(error, req, res);
  }
};


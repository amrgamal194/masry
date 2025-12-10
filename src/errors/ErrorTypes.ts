import AppError from './AppError.js';
import { ValidationError as ValidationErrorType } from '../types/index.js';

// Bad Request Error (400)
export class BadRequestError extends AppError {
  constructor(message: string = 'Bad Request') {
    super(message, 400);
    this.name = 'BadRequestError';
  }
}

// Unauthorized Error (401)
export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401);
    this.name = 'UnauthorizedError';
  }
}

// Forbidden Error (403)
export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden') {
    super(message, 403);
    this.name = 'ForbiddenError';
  }
}

// Not Found Error (404)
export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

// Conflict Error (409)
export class ConflictError extends AppError {
  constructor(message: string = 'Resource conflict') {
    super(message, 409);
    this.name = 'ConflictError';
  }
}

// Validation Error (422)
export class ValidationError extends AppError {
  public errors: ValidationErrorType[];

  constructor(message: string = 'Validation failed', errors: ValidationErrorType[] = []) {
    super(message, 422);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

// Internal Server Error (500)
export class InternalServerError extends AppError {
  constructor(message: string = 'Internal Server Error') {
    super(message, 500);
    this.name = 'InternalServerError';
  }
}

// Service Unavailable Error (503)
export class ServiceUnavailableError extends AppError {
  constructor(message: string = 'Service Unavailable') {
    super(message, 503);
    this.name = 'ServiceUnavailableError';
  }
}


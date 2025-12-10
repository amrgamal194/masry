import { Response } from 'express';
import { HTTP_STATUS } from '../constants/index.js';
import { ApiResponse, PaginationMeta, ValidationError } from '../types/index.js';

/**
 * Standard API Response Formatter
 */
class ResponseFormatter {
  /**
   * Success response
   */
  success<T = any>(
    res: Response,
    data: T | undefined = undefined,
    message: string = 'Success',
    statusCode: number = HTTP_STATUS.OK
  ): Response {
    const response: ApiResponse<T> = {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    };
    return res.status(statusCode).json(response);
  }

  /**
   * Created response
   */
  created<T = any>(
    res: Response,
    data: T | undefined = undefined,
    message: string = 'Resource created successfully'
  ): Response {
    return this.success(res, data, message, HTTP_STATUS.CREATED);
  }

  /**
   * No content response
   */
  noContent(res: Response): Response {
    return res.status(HTTP_STATUS.NO_CONTENT).send();
  }

  /**
   * Paginated response
   */
  paginated<T = any>(
    res: Response,
    data: T[],
    pagination: PaginationMeta,
    message: string = 'Success'
  ): Response {
    const response: ApiResponse<T[]> = {
      success: true,
      message,
      data,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total: pagination.total,
        pages: Math.ceil(pagination.total / pagination.limit),
        hasNext: pagination.page < Math.ceil(pagination.total / pagination.limit),
        hasPrev: pagination.page > 1,
      },
      timestamp: new Date().toISOString(),
    };
    return res.status(HTTP_STATUS.OK).json(response);
  }

  /**
   * Error response
   */
  error(
    res: Response,
    message: string,
    statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    errors: ValidationError[] | undefined = undefined
  ): Response {
    const response: ApiResponse = {
      success: false,
      message,
      timestamp: new Date().toISOString(),
    };

    if (errors) {
      response.errors = errors;
    }

    return res.status(statusCode).json(response);
  }
}

export default new ResponseFormatter();


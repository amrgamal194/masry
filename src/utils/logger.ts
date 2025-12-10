import { Request, Response } from 'express';
import config from '../config/env.js';
import { LogMeta } from '../types/index.js';

/**
 * Advanced Logger Utility
 */
class Logger {
  private isDevelopment: boolean;

  constructor() {
    this.isDevelopment = config.nodeEnv === 'development';
  }

  /**
   * Format log message
   */
  private formatMessage(level: string, message: string, meta: LogMeta = {}): object {
    const timestamp = new Date().toISOString();
    return {
      timestamp,
      level: level.toUpperCase(),
      message,
      ...meta,
    };
  }

  /**
   * Log info message
   */
  info(message: string, meta: LogMeta = {}): void {
    const logData = this.formatMessage('info', message, meta);
    console.log(JSON.stringify(logData));
  }

  /**
   * Log error message
   */
  error(message: string, error: Error | null = null, meta: LogMeta = {}): void {
    const logData = this.formatMessage('error', message, {
      ...meta,
      error: error ? {
        message: error.message,
        stack: this.isDevelopment ? error.stack : undefined,
        name: error.name,
      } : undefined,
    });
    console.error(JSON.stringify(logData));
  }

  /**
   * Log warning message
   */
  warn(message: string, meta: LogMeta = {}): void {
    const logData = this.formatMessage('warn', message, meta);
    console.warn(JSON.stringify(logData));
  }

  /**
   * Log debug message
   */
  debug(message: string, meta: LogMeta = {}): void {
    if (this.isDevelopment) {
      const logData = this.formatMessage('debug', message, meta);
      console.debug(JSON.stringify(logData));
    }
  }

  /**
   * Log HTTP request
   */
  request(req: Request, res: Response, responseTime: number): void {
    const logData = {
      timestamp: new Date().toISOString(),
      level: 'INFO',
      type: 'HTTP_REQUEST',
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      responseTime: `${responseTime}ms`,
      ip: req.ip,
      userAgent: req.get('user-agent'),
      requestId: req.id,
    };

    if (res.statusCode >= 400) {
      console.error(JSON.stringify(logData));
    } else {
      console.log(JSON.stringify(logData));
    }
  }
}

export default new Logger();


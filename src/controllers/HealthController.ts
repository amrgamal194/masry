import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import responseFormatter from '../utils/response.js';
import mongoose from 'mongoose';
import config from '../config/env.js';

class HealthController {
  // Basic health check
  health = asyncHandler(async (_req: Request, res: Response) => {
    return responseFormatter.success(res, {
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      environment: config.nodeEnv,
    }, 'Service is healthy');
  });

  // Detailed health check with database status
  healthCheck = asyncHandler(async (_req: Request, res: Response) => {
    const healthData = {
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      environment: config.nodeEnv,
      version: process.env.npm_package_version || '1.0.0',
      services: {
        database: {
          status: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
          readyState: mongoose.connection.readyState,
        },
      },
      memory: {
        used: Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100,
        total: Math.round((process.memoryUsage().heapTotal / 1024 / 1024) * 100) / 100,
        unit: 'MB',
      },
    };

    const isHealthy = healthData.services.database.status === 'connected';
    const statusCode = isHealthy ? 200 : 503;

    return res.status(statusCode).json({
      success: isHealthy,
      data: healthData,
      timestamp: new Date().toISOString(),
    });
  });
}

export default new HealthController();


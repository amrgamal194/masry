import express, { Router, Request, Response } from 'express';
import authRoutes from '../authRoutes.js';
import profileRoutes from '../profileRoutes.js';
import rateLimit from 'express-rate-limit';

const router: Router = express.Router();

// Stricter rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// API v1 routes
router.use('/auth', authLimiter, authRoutes);
router.use('/profile', profileRoutes);

// API info endpoint
router.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'API v1 is running',
    version: '1.0.0',
    endpoints: {
      auth: '/api/v1/auth',
      profile: '/api/v1/profile',
    },
    timestamp: new Date().toISOString(),
  });
});

export default router;


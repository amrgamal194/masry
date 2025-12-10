import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.js';
import userRepository from '../repositories/UserRepository.js';
import { UnauthorizedError, ForbiddenError } from '../errors/ErrorTypes.js';
import { IUser } from '../types/index.js';

// Protect routes - require authentication
export const protect = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  try {
    let token: string | undefined;

    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new UnauthorizedError('Not authorized to access this route'));
    }

    try {
      // Verify token
      const decoded = verifyToken(token);

      // Get user from token
      const user = await userRepository.findById(decoded.id);
      if (!user) {
        return next(new UnauthorizedError('User no longer exists'));
      }

      if (!user.isActive) {
        return next(new UnauthorizedError('Your account has been deactivated'));
      }

      // Grant access to protected route
      req.user = user as IUser;
      next();
    } catch (error) {
      return next(new UnauthorizedError('Not authorized to access this route'));
    }
  } catch (error) {
    next(error);
  }
};

// Restrict to specific roles
export const restrictTo = (...roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new UnauthorizedError('Please log in to access this route'));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new ForbiddenError('You do not have permission to perform this action')
      );
    }
    next();
  };
};

// Optional authentication (doesn't fail if no token)
export const optionalAuth = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  try {
    let token: string | undefined;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      try {
        const decoded = verifyToken(token);
        const user = await userRepository.findById(decoded.id);
        if (user && user.isActive) {
          req.user = user as IUser;
        }
      } catch (error) {
        // Ignore token errors for optional auth
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};


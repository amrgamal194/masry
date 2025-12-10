import jwt, { SignOptions } from 'jsonwebtoken';
import config from '../config/env.js';
import { JWTPayload, TokenPair } from '../types/index.js';

// Generate JWT Token
export const generateToken = (userId: string): string => {
  return jwt.sign(
    { id: userId },
    config.jwt.secret,
    { expiresIn: config.jwt.expire } as SignOptions
  );
};

// Generate Refresh Token
export const generateRefreshToken = (userId: string): string => {
  return jwt.sign(
    { id: userId },
    config.jwt.refreshSecret,
    { expiresIn: config.jwt.refreshExpire } as SignOptions
  );
};

// Verify JWT Token
export const verifyToken = (token: string): JWTPayload => {
  return jwt.verify(token, config.jwt.secret) as JWTPayload;
};

// Verify Refresh Token
export const verifyRefreshToken = (token: string): JWTPayload => {
  return jwt.verify(token, config.jwt.refreshSecret) as JWTPayload;
};

// Generate both tokens
export const generateTokens = (userId: string): TokenPair => {
  return {
    token: generateToken(userId),
    refreshToken: generateRefreshToken(userId),
  };
};

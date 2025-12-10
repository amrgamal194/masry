import { Request } from 'express';
import { IUser } from '../models/User.js';

// Request Types
export interface AuthRequest extends Request {
  user?: IUser;
  id?: string;
}

// Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: ValidationError[];
  pagination?: PaginationMeta;
  requestId?: string;
  timestamp: string;
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// JWT Types
export interface JWTPayload {
  id: string;
  iat?: number;
  exp?: number;
}

export interface TokenPair {
  token: string;
  refreshToken: string;
}

// Service Types
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

// Repository Types
export interface FindOptions {
  includePassword?: boolean;
  includeRefreshToken?: boolean;
}

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sort?: string;
}

// Email Types
export interface EmailOptions {
  email: string;
  subject: string;
  message: string;
  html?: string;
}

// Query Types
export interface QueryParams {
  page?: string;
  limit?: string;
  sort?: string;
  fields?: string;
  search?: string;
  [key: string]: any;
}

// Migration Types
export interface Migration {
  name: string;
  up: (session?: any) => Promise<void>;
  down: (session?: any) => Promise<void>;
  timestamp: number;
}

export interface MigrationRecord {
  name: string;
  timestamp: number;
  executedAt: Date;
}

// Error Types
export interface ErrorDetails {
  field?: string;
  message: string;
  code?: string;
}

// Logger Types
export interface LogMeta {
  [key: string]: any;
}

// Config Types
export interface Config {
  port: number;
  nodeEnv: string;
  mongodbUri: string;
  jwt: {
    secret: string;
    expire: string;
    refreshSecret: string;
    refreshExpire: string;
  };
  passwordReset: {
    expire: number;
  };
  email: {
    host: string;
    port: string | number;
    user: string;
    pass: string;
    from: string;
  };
}

// Re-export types for convenience
export type { IUser } from '../models/User.js';
export type { IProfile, UpdateProfileData } from './Profile.js';

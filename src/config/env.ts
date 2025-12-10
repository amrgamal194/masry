import dotenv from 'dotenv';
import { Config } from '../types/index.js';

dotenv.config();

const config: Config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/masary_db',
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expire: process.env.JWT_EXPIRE || '7d',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key',
    refreshExpire: process.env.JWT_REFRESH_EXPIRE || '30d',
  },
  passwordReset: {
    expire: parseInt(process.env.PASSWORD_RESET_EXPIRE || '3600000', 10), // 1 hour
  },
  email: {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || '587',
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || '',
    from: process.env.EMAIL_FROM || 'noreply@masary.com',
  },
};

export default config;


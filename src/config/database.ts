import mongoose from 'mongoose';
import config from './env.js';
import logger from '../utils/logger.js';

const connectDB = async (): Promise<void> => {
  try {
    const mongodbUri = config.mongodbUri;
    
    if (!mongodbUri) {
      throw new Error('MongoDB URI is not configured. Please set MONGODB_URI in your .env file');
    }

    logger.info('Connecting to MongoDB', {
      uri: mongodbUri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'), // Hide credentials in logs
    });

    // Connect using mongodbUri from config
    // Note: useNewUrlParser and useUnifiedTopology are deprecated in Mongoose 6+
    const conn = await mongoose.connect(mongodbUri);

    logger.info('MongoDB connected successfully', {
      host: conn.connection.host,
      database: conn.connection.name,
      readyState: conn.connection.readyState,
    });
  } catch (error) {
    logger.error('MongoDB connection error', error as Error, {
      mongodbUri: config.mongodbUri ? 'configured' : 'missing',
    });
    process.exit(1);
  }
};

export default connectDB;


import mongoose, { ClientSession } from 'mongoose';

/**
 * Execute a function within a database transaction
 * @param fn - Function to execute within transaction
 * @returns Result of the function
 */
export const withTransaction = async <T>(
  fn: (session: ClientSession) => Promise<T>
): Promise<T> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const result = await fn(session);
    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};


import mongoose from 'mongoose';

/**
 * Migration: Create users table
 * This migration creates the users collection with indexes
 */
export const up = async (): Promise<void> => {
  const db = mongoose.connection.db;
  if (!db) {
    throw new Error('Database connection not available');
  }

  // Create users collection if it doesn't exist
  const collections = await db.listCollections({ name: 'users' }).toArray();
  if (collections.length === 0) {
    await db.createCollection('users');
    console.log('Created users collection');
  }

  // Create indexes
  const usersCollection = db.collection('users');
  
  // Email index (unique)
  await usersCollection.createIndex({ email: 1 }, { unique: true });
  console.log('Created email index');

  // Role index
  await usersCollection.createIndex({ role: 1 });
  console.log('Created role index');

  // isActive index
  await usersCollection.createIndex({ isActive: 1 });
  console.log('Created isActive index');

  // CreatedAt index for sorting
  await usersCollection.createIndex({ createdAt: -1 });
  console.log('Created createdAt index');

  // Compound index for common queries
  await usersCollection.createIndex({ isActive: 1, role: 1 });
  console.log('Created compound index (isActive, role)');
};

export const down = async (): Promise<void> => {
  const db = mongoose.connection.db;
  if (!db) {
    throw new Error('Database connection not available');
  }

  // Drop users collection
  await db.collection('users').drop();
  console.log('Dropped users collection');
};


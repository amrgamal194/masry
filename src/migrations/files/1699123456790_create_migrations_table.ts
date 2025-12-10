import mongoose from 'mongoose';

/**
 * Migration: Create migrations table
 * This migration creates the migrations collection to track executed migrations
 */
export const up = async (): Promise<void> => {
  const db = mongoose.connection.db;
  if (!db) {
    throw new Error('Database connection not available');
  }

  // Create migrations collection if it doesn't exist
  const collections = await db.listCollections({ name: 'migrations' }).toArray();
  if (collections.length === 0) {
    await db.createCollection('migrations');
    console.log('Created migrations collection');
  }

  // Create indexes
  const migrationsCollection = db.collection('migrations');
  
  // Name index (unique)
  await migrationsCollection.createIndex({ name: 1 }, { unique: true });
  console.log('Created name index on migrations');

  // Timestamp index for sorting
  await migrationsCollection.createIndex({ timestamp: 1 });
  console.log('Created timestamp index on migrations');
};

export const down = async (): Promise<void> => {
  const db = mongoose.connection.db;
  if (!db) {
    throw new Error('Database connection not available');
  }

  // Drop migrations collection
  await db.collection('migrations').drop();
  console.log('Dropped migrations collection');
};


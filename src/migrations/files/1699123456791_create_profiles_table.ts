import mongoose from 'mongoose';

/**
 * Migration: Create profiles table
 * This migration creates the profiles collection with indexes
 */
export const up = async (): Promise<void> => {
  const db = mongoose.connection.db;
  if (!db) {
    throw new Error('Database connection not available');
  }

  // Create profiles collection if it doesn't exist
  const collections = await db.listCollections({ name: 'profiles' }).toArray();
  if (collections.length === 0) {
    await db.createCollection('profiles');
    console.log('Created profiles collection');
  }

  // Create indexes
  const profilesCollection = db.collection('profiles');
  
  // User index (unique)
  await profilesCollection.createIndex({ user: 1 }, { unique: true });
  console.log('Created user index on profiles');

  // CreatedAt index for sorting
  await profilesCollection.createIndex({ createdAt: -1 });
  console.log('Created createdAt index on profiles');
};

export const down = async (): Promise<void> => {
  const db = mongoose.connection.db;
  if (!db) {
    throw new Error('Database connection not available');
  }

  // Drop profiles collection
  await db.collection('profiles').drop();
  console.log('Dropped profiles collection');
};




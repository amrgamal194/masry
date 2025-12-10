// MongoDB initialization script
// This script runs when MongoDB container starts for the first time

// Switch to masary_db database
db = db.getSiblingDB('masary_db');

// Create collections with validation
db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'email', 'password'],
      properties: {
        name: {
          bsonType: 'string',
          description: 'Name is required and must be a string'
        },
        email: {
          bsonType: 'string',
          pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
          description: 'Email is required and must be a valid email'
        },
        password: {
          bsonType: 'string',
          minLength: 6,
          description: 'Password is required and must be at least 6 characters'
        }
      }
    }
  }
});

// Create indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ role: 1 });
db.users.createIndex({ isActive: 1 });
db.users.createIndex({ createdAt: -1 });
db.users.createIndex({ isActive: 1, role: 1 });

// Create migrations collection
db.createCollection('migrations');
db.migrations.createIndex({ name: 1 }, { unique: true });
db.migrations.createIndex({ timestamp: 1 });

print('Database initialized successfully!');


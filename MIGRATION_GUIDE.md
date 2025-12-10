# Migration System Guide

## Overview

This project includes a comprehensive database migration system that allows you to version control your database schema changes.

## Migration Commands

### Run Migrations

```bash
# Run all pending migrations
npm run migrate:up

# Or simply
npm run migrate
```

### Rollback Migrations

```bash
# Rollback the last migration
npm run migrate:down
```

### Check Migration Status

```bash
# View which migrations have been executed
npm run migrate:status
```

## Creating New Migrations

### Manual Creation

1. Create a new file in `src/migrations/files/` with the naming pattern:
   ```
   {timestamp}_{migration_name}.ts
   ```

2. Example: `1699123456789_add_user_profile_fields.ts`

3. The file should export `up` and `down` functions:

```typescript
export const up = async (): Promise<void> => {
  const db = mongoose.connection.db;
  if (!db) {
    throw new Error('Database connection not available');
  }

  // Your migration logic here
  await db.collection('users').updateMany(
    {},
    { $set: { newField: 'defaultValue' } }
  );
  
  console.log('Migration completed');
};

export const down = async (): Promise<void> => {
  const db = mongoose.connection.db;
  if (!db) {
    throw new Error('Database connection not available');
  }

  // Rollback logic here
  await db.collection('users').updateMany(
    {},
    { $unset: { newField: '' } }
  );
  
  console.log('Migration rolled back');
};
```

## Migration Best Practices

1. **Always provide a down migration** - This allows you to rollback if needed
2. **Use transactions when possible** - For complex migrations
3. **Test migrations** - Test both up and down migrations
4. **Use descriptive names** - Make it clear what the migration does
5. **Don't modify existing migrations** - Create new ones instead
6. **Backup before migrations** - Especially in production

## Migration File Structure

```
src/migrations/
├── migrate.ts              # Migration runner
├── files/                  # Migration files
│   ├── 1699123456789_create_users_table.ts
│   └── 1699123456790_create_migrations_table.ts
```

## Example Migrations

### Creating a Collection

```typescript
export const up = async (): Promise<void> => {
  const db = mongoose.connection.db;
  if (!db) throw new Error('Database connection not available');

  await db.createCollection('products');
  await db.collection('products').createIndex({ name: 1 }, { unique: true });
};

export const down = async (): Promise<void> => {
  const db = mongoose.connection.db;
  if (!db) throw new Error('Database connection not available');

  await db.collection('products').drop();
};
```

### Adding a Field

```typescript
export const up = async (): Promise<void> => {
  const db = mongoose.connection.db;
  if (!db) throw new Error('Database connection not available');

  await db.collection('users').updateMany(
    {},
    { $set: { isVerified: false } }
  );
};

export const down = async (): Promise<void> => {
  const db = mongoose.connection.db;
  if (!db) throw new Error('Database connection not available');

  await db.collection('users').updateMany(
    {},
    { $unset: { isVerified: '' } }
  );
};
```

### Creating Indexes

```typescript
export const up = async (): Promise<void> => {
  const db = mongoose.connection.db;
  if (!db) throw new Error('Database connection not available');

  const collection = db.collection('users');
  await collection.createIndex({ email: 1 }, { unique: true });
  await collection.createIndex({ createdAt: -1 });
  await collection.createIndex({ isActive: 1, role: 1 });
};

export const down = async (): Promise<void> => {
  const db = mongoose.connection.db;
  if (!db) throw new Error('Database connection not available');

  const collection = db.collection('users');
  await collection.dropIndex('email_1');
  await collection.dropIndex('createdAt_-1');
  await collection.dropIndex('isActive_1_role_1');
};
```

## Migration Tracking

The system automatically tracks executed migrations in the `migrations` collection. Each migration record contains:
- `name`: Migration file name
- `timestamp`: Migration timestamp
- `executedAt`: When the migration was executed

## Troubleshooting

### Migration Fails

If a migration fails:
1. Check the error message
2. Fix the migration file
3. Rollback if needed: `npm run migrate:down`
4. Fix and re-run: `npm run migrate:up`

### Migration Already Executed

If you need to re-run a migration:
1. Remove it from the migrations collection:
   ```javascript
   db.migrations.deleteOne({ name: 'migration_name' });
   ```
2. Re-run the migration

### Production Migrations

For production:
1. Always backup the database first
2. Test migrations on a staging environment
3. Run migrations during low-traffic periods
4. Monitor the application after migration
5. Have a rollback plan ready


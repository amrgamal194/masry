import mongoose from 'mongoose';
import { readdirSync } from 'fs';
import { join, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import config from '../config/env.js';
import Migration from '../models/Migration.js';
import logger from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface MigrationFile {
  name: string;
  timestamp: number;
  up: () => Promise<void>;
  down: () => Promise<void>;
}

const loadMigrations = async (): Promise<MigrationFile[]> => {
  const migrationsDir = join(__dirname, 'files');
  const files = readdirSync(migrationsDir)
    .filter((file) => file.endsWith('.ts') || file.endsWith('.js'))
    .sort();

  const migrations: MigrationFile[] = [];

  for (const file of files) {
    try {
      const migration = await import(`./files/${file}`);
      const timestamp = parseInt(basename(file, file.includes('.ts') ? '.ts' : '.js').split('_')[0], 10);
      
      if (migration.up && migration.down) {
        migrations.push({
          name: basename(file, file.includes('.ts') ? '.ts' : '.js'),
          timestamp,
          up: migration.up,
          down: migration.down,
        });
      }
    } catch (error) {
      logger.error(`Failed to load migration ${file}`, error as Error);
    }
  }

  return migrations.sort((a, b) => a.timestamp - b.timestamp);
};

const runMigrations = async (direction: 'up' | 'down' = 'up'): Promise<void> => {
  try {
    await mongoose.connect(config.mongodbUri);
    logger.info('Connected to database for migrations');

    const migrations = await loadMigrations();
    const executedMigrations = await Migration.find().sort({ timestamp: 1 });

    if (direction === 'up') {
      // Run pending migrations
      for (const migration of migrations) {
        const executed = executedMigrations.find((m) => m.name === migration.name);
        if (!executed) {
          logger.info(`Running migration: ${migration.name}`);
          await migration.up();
          await Migration.create({
            name: migration.name,
            timestamp: migration.timestamp,
            executedAt: new Date(),
          });
          logger.info(`Migration completed: ${migration.name}`);
        }
      }
    } else {
      // Rollback migrations in reverse order
      const migrationsToRollback = executedMigrations.reverse();
      for (const executed of migrationsToRollback) {
        const migration = migrations.find((m) => m.name === executed.name);
        if (migration) {
          logger.info(`Rolling back migration: ${migration.name}`);
          await migration.down();
          await Migration.deleteOne({ name: migration.name });
          logger.info(`Migration rolled back: ${migration.name}`);
        }
      }
    }

    await mongoose.connection.close();
    logger.info('Migrations completed');
  } catch (error) {
    logger.error('Migration failed', error as Error);
    process.exit(1);
  }
};

const showStatus = async (): Promise<void> => {
  try {
    await mongoose.connect(config.mongodbUri);
    logger.info('Connected to database for migration status');

    const migrations = await loadMigrations();
    const executedMigrations = await Migration.find().sort({ timestamp: 1 });

    console.log('\nMigration Status:');
    console.log('================\n');

    for (const migration of migrations) {
      const executed = executedMigrations.find((m) => m.name === migration.name);
      const status = executed ? '✓ Executed' : '○ Pending';
      const date = executed ? ` (${executed.executedAt.toISOString()})` : '';
      console.log(`${status} - ${migration.name}${date}`);
    }

    await mongoose.connection.close();
  } catch (error) {
    logger.error('Failed to get migration status', error as Error);
    process.exit(1);
  }
};

// Main execution
const command = process.argv[2] || 'up';

if (command === 'status') {
  showStatus();
} else if (command === 'up' || command === 'down') {
  runMigrations(command);
} else {
  console.log('Usage: npm run migrate [up|down|status]');
  process.exit(1);
}


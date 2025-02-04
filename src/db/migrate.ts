// db/migrate.ts
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { db } from './index';

// This will automatically run needed migrations
migrate(db, { migrationsFolder: './drizzle' });
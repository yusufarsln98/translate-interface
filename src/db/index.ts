import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import { models } from './schema'

const sqlite = new Database('./src/db/sqlite.db')
export const db = drizzle(sqlite)

// Insert default values
const defaultTranslators = [
  {
    id: '1',
    modelName: 'm2m-100-1.2B',
    modelUrl: 'http://localhost:8000/translate',
    label: 'M2M 100 1.2B',
  },
  {
    id: '2',
    modelName: 'local-ai',
    modelUrl: 'http://localhost:8001/api/generate',
    label: 'Local AI',
  },
]

export type TranslatorType = (typeof defaultTranslators)[number]

try {
  for (const value of defaultTranslators) {
    db.insert(models).values(value).run()
  }
} catch {
  console.log('Default values might already exist')
}

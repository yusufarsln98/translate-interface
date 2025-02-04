import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const models = sqliteTable('models', {
  id: text('id').primaryKey(),
  modelName: text('modelName'),
  modelUrl: text('modelUrl').unique().notNull(),
  label: text('label').unique().notNull(),
})

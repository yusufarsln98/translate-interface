import type { Config } from 'drizzle-kit'

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  driver: 'd1-http',
  dbCredentials: {
    accountId: '',
    databaseId: '',
    token: '',
  },
  dialect: 'sqlite',
} as Config

// Applies supabase/schema.sql to the Vercel-provisioned Postgres.
// Safe to re-run: every statement is create-if-not-exists or create-or-replace.
import fs from 'node:fs'
import path from 'node:path'
import 'dotenv/config'
import pg from 'pg'

const url = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL
if (!url) {
  console.error('No POSTGRES_URL_NON_POOLING in the environment. Run: vercel env pull .env.local')
  process.exit(1)
}

const sql = fs.readFileSync(path.join(process.cwd(), 'supabase/schema.sql'), 'utf8')

// pg >= 8.23 lets sslmode in the URL win over the ssl option. Supabase's pooler
// presents a chain Node does not bundle a root for, so strip sslmode and set TLS here.
const parsed = new URL(url)
parsed.searchParams.delete('sslmode')

const client = new pg.Client({
  connectionString: parsed.toString(),
  ssl: { rejectUnauthorized: false },
})
await client.connect()

try {
  await client.query(sql)
  console.log('Schema applied.')
} catch (err) {
  console.error('Migration failed:', err.message)
  process.exitCode = 1
} finally {
  await client.end()
}

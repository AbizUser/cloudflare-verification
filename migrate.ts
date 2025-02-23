import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL!;
const sql = postgres(connectionString, { max: 1 });

async function main() {
  const db = drizzle(sql);
  console.log('Running migrations...');
  await migrate(db, { migrationsFolder: './drizzle' });
  console.log('Migrations complete!');
  await sql.end();
}

main().catch((err) => {
  console.error('Migration failed');
  console.error(err);
  process.exit(1);
});
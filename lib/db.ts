// import { drizzle } from 'drizzle-orm/postgres-js';
// import postgres from 'postgres';
// import * as schema from '../src/db/schema';

// const connectionString = process.env.DATABASE_URL!;
// const client = postgres(connectionString);
// const db = drizzle(client, { schema });

// export { db };


// import { drizzle } from 'drizzle-orm/d1';
// import * as schema from '../src/db/schema';

// // D1データベースのインスタンスは環境変数から取得します
// export function getDb(env: { DB: D1Database }) {
//   return drizzle(env.DB, { schema });
// }


import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from '@/src/db/schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

export { db };
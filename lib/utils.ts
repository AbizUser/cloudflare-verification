// import { type ClassValue, clsx } from "clsx"
// import { twMerge } from "tailwind-merge"
// import { isAfter } from 'date-fns'

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }

// export function getTaskStatus(dueDate: Date, completed: boolean): '完了' | '期限切れ' | '未完了' {
//   if (completed) return '完了'
//   return isAfter(new Date(), dueDate) ? '期限切れ' : '未完了'
// }




// import { drizzle } from 'drizzle-orm/postgres-js';
// import postgres from 'postgres';
// // import * as schema from './schema';
// import * as schema from './schema';

// const connectionString = process.env.DATABASE_URL!;
// const client = postgres(connectionString);
// const db = drizzle(client, { schema });

// export { db };



import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"


//ユーティリティ関数の定義
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


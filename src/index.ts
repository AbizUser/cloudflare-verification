// import { drizzle } from 'drizzle-orm/neon-http';

// const db = drizzle(process.env.DATABASE_URL!);

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { tasks } from './db/schema';
  
const db = drizzle(process.env.DATABASE_URL!);

// import { db } from './db';  // Drizzle ORMのインスタンス
// import { tasks } from './schema';  // スキーマ定義
import { v4 as uuidv4 } from 'uuid';  // UUIDを生成するためのライブラリ

async function insertTask() {
  const newTask = {
    // id: uuidv4(),
    id: uuidv4(),
    title: "新しいタスク",
    description: "これは新しいタスクの説明です。",
    dueDate: new Date(),  // 現在時刻
    status: "未完了",
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const insertedTask = await db.insert(tasks).values(newTask).returning();
  console.log("挿入されたタスク:", insertedTask[0]);
}
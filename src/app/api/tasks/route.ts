export const runtime = 'edge';

import { NextResponse } from 'next/server'
import { db } from '@/lib/db'  // Drizzle ORMのインスタンスをインポート
import { tasks } from '@/src/db/schema'  // スキーマ定義をインポート
import { getTaskStatus } from '@/lib/taskHelpers'
import { eq } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'  // UUIDを生成するためのライブラリ

export async function GET() {
  const allTasks = await db.select().from(tasks)
  return NextResponse.json(allTasks)
}

export async function POST(request: Request) {
  const body = await request.json()
  const newTask = {
    id: uuidv4(),  // UUIDを生成
    title: body.title,
    description: body.description,
    dueDate: new Date(body.dueDate),
    status: getTaskStatus(new Date(body.dueDate), false),
    createdAt: new Date(),
    updatedAt: new Date()
  }
  
  const insertedTask = await db.insert(tasks).values(newTask).returning()
  return NextResponse.json(insertedTask[0])
}

export async function PUT(request: Request) {
  const body = await request.json()
  const { id, status } = body

  const updatedTask = await db.update(tasks)
    .set({ 
      status: status,
      updatedAt: new Date()
    })
    .where(eq(tasks.id, id))
    .returning()

  return NextResponse.json(updatedTask[0])
}
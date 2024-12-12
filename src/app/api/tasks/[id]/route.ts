export const runtime = 'edge';

import { NextResponse } from 'next/server'
import { db } from '@/lib/db'  // Drizzle ORMのインスタンスをインポート
import { tasks } from '@/src/db/schema'  // スキーマ定義をインポート
import { eq } from 'drizzle-orm'

import { NextRequest, } from 'next/server'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const body = await request.json()

    const updatedTask = await db.update(tasks)
      .set({ 
        title: body.title,
        description: body.description,
        dueDate: new Date(body.dueDate),
        status: body.status,
        updatedAt: new Date()
      })
      .where(eq(tasks.id, id))
      .returning()

    if (updatedTask.length === 0) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    return NextResponse.json(updatedTask[0])
  } catch (error) {
    console.error('Error updating task:', error)
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 })
  }
}

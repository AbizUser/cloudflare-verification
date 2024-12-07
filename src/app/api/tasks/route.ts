// import { NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma'
// import { getTaskStatus } from '@/lib/utils'

// export async function GET() {
//   const tasks = await prisma.task.findMany()
//   return NextResponse.json(tasks)
// }

// export async function POST(request: Request) {
//   const body = await request.json()
//   const task = await prisma.task.create({
//     data: {
//       title: body.title,
//       description: body.description,
//       dueDate: new Date(body.dueDate),
//       status: getTaskStatus(new Date(body.dueDate), false),
//     },
//   })
//   return NextResponse.json(task)
// }

import { NextResponse } from 'next/server'
import { db } from '@/lib/db'  // Drizzle ORMのインスタンスをインポート
import { tasks } from '@/src/db/schema'  // スキーマ定義をインポート
import { getTaskStatus } from '@/lib/utils'
// import { eq } from 'drizzle-orm'
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
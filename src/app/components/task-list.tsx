'use client'
import { useEffect, useState } from 'react'
import { TaskItem } from './task-item'
import { isAfter } from 'date-fns'

interface Task {
  id: string
  title: string
  description: string
  dueDate: string
  status: string
}

interface TaskListProps {
  view: 'all' | 'expired' | 'completed'
}

export function TaskList({ view }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([])

  const fetchTasks = async () => {
    const response = await fetch('/api/tasks')
    const data = await response.json()
    setTasks(data)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const filteredTasks = tasks.filter(task => {
    if (view === 'all') return true
    if (view === 'expired') return isAfter(new Date(), new Date(task.dueDate)) && task.status !== '完了'
    if (view === 'completed') return task.status == '完了'
    return false
  })

  return (
    <div className=" flex gap-2">
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} onTaskUpdated={fetchTasks} />
      ))}
      {filteredTasks.length === 0 && (
        <p className="text-center text-gray-500">表示するタスクがありません。</p>
      )}
    </div>
  )
}


'use client'

import { useState } from 'react'
import { TaskForm } from './components/task-form'
import { TaskList } from './components/task-list'
import { Sidebar } from './components/sidebar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { PlusIcon } from 'lucide-react'

export default function Home() {
  const [currentView, setCurrentView] = useState<'all' | 'expired' | 'completed'>('all')
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleTaskAdded = () => {
    setIsFormOpen(false)
  }

  return (
    <div className="flex">
      <Sidebar onViewChange={setCurrentView} />
      <main className="flex-1 p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">一覧表示</h1>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusIcon className="mr-2 h-4 w-4" />
                新規タスク
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>新規タスクの追加</DialogTitle>
              </DialogHeader>
              <TaskForm onTaskAdded={handleTaskAdded} />
            </DialogContent>
          </Dialog>
        </div>
        <TaskList view={currentView} />
      </main>
    </div>
  )
}


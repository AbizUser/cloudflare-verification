'use client'

import { useState } from 'react'
import { TaskForm } from './components/task-form'
import { TaskList } from './components/task-list'
import { Sidebar } from './components/sidebar'
import { DialogOverlay, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/src/app/components/ui/dialog"
// import { Button } from "@/src/app/components/ui/button"
// import { PlusIcon } from 'lucide-react'

export default function Home() {
  const [currentView, setCurrentView] = useState<'all' | 'expired' | 'completed'>('all')
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleTaskAdded = () => {
    setIsFormOpen(false)
  }

  const handleCreateTask = () => {
    setIsFormOpen(true)
  }

  return (
    <div className="flex">
      <Sidebar onViewChange={setCurrentView} onCreateTask={handleCreateTask} />
      <main className="flex-1 p-4 ">
        <div className="flex justify-between items-center mb-4  ![&>*]:bg-white !z-9999 !opacity-100 !text-red-600">
          {/* <h1 className="text-2xl font-bold">一覧表示</h1> */}
          <Dialog  
            open={isFormOpen}
            onOpenChange={setIsFormOpen}
            >
            <DialogTrigger asChild>
              {/* <Button onClick={handleCreateTask}>
                <PlusIcon className="mr-2 h-4 w-4" />
                新規タスク
              </Button> */}
            </DialogTrigger>
            {/* <DialogContent className='![&>*]:bg-red-111 !z-1000 !opacity-100'> */}
            {/* <DialogOverlay className="bg-black/20" /> */}
            <DialogOverlay className="bg-black/30" />
            {/* <DialogContent> */}
            <DialogContent className='!bg-white !z-9999 !opacity-100'>
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
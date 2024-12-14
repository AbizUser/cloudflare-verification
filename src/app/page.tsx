'use client'

import { useState } from 'react'
import { TaskForm } from './components/task-form'
import { TaskList } from './components/task-list'
import { Sidebar } from './components/sidebar'
import { DialogOverlay, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/src/app/components/ui/dialog"


export default function Home() {
  const [currentView, setCurrentView] = useState<'all' | 'expired' | 'completed'>('all')
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleTaskAdded = () => {
    setIsFormOpen(false);
  }

  const handleCreateTask = () => {

    setIsFormOpen(true)
  }

  return (
    <div className="flex width">
      <Sidebar onViewChange={setCurrentView} onCreateTask={handleCreateTask} />
      <main className="flex-1 p-4">
        <div className="flex justify-between items-center mb-4  ![&>*]:bg-white !z-9999 !opacity-100 !text-red-600">
          <Dialog  
            open={isFormOpen}
            onOpenChange={setIsFormOpen}
            >
            <DialogTrigger asChild>
            </DialogTrigger>
            <DialogOverlay className="bg-black/30" />
            <DialogContent className='!bg-white !z-9999 !opacity-100'>
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
                
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
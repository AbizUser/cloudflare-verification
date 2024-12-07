import { useState } from 'react'

export function useTaskDialog() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleCreateTask = () => {
    setIsFormOpen(true)
  }

  const handleTaskAdded = () => {
    setIsFormOpen(false)
  }

  return {
    isFormOpen,
    setIsFormOpen,
    handleCreateTask,
    handleTaskAdded
  }
}
'use client'
import { useState } from 'react'
import { Button } from "@/src/app/components/ui/button"
import { Input } from "@/src/app/components/ui/input"
import { Textarea } from "@/src/app/components/ui/textarea"
import { Calendar } from "@/src/app/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/src/app/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from 'lucide-react'

export function TaskForm({ onTaskAdded }: { onTaskAdded: () => void }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState<Date>()

  const commonClasses = 'border border-solid hover:border-yellow-400'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !dueDate) return

    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, dueDate }),
    })

    if (response.ok) {
      setTitle('')
      setDescription('')
      setDueDate(undefined)
      onTaskAdded()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className={`${commonClasses}`}
      />
      <Textarea
        placeholder="Detail"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={`${commonClasses}`}
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className={`${commonClasses}`}>
            {dueDate ? format(dueDate, "PPP") : <span>DueDate</span>}
            <CalendarIcon className="ml-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={dueDate}
            onSelect={setDueDate}
            initialFocus
            className='bg-white'
          />
        </PopoverContent>
      </Popover>
      <Button type="submit" className={`ml-2 ${commonClasses}`}>Add Task</Button>
    </form>
  )
}


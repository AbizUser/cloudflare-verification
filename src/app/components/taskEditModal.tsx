import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/app/components/ui/dialog";
import { Button } from "@/src/app/components/ui/button";
import { Input } from "@/src/app/components/ui/input";
import { Textarea } from "@/src/app/components/ui/textarea";
import { Calendar } from "@/src/app/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/app/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from 'lucide-react';
// import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";


interface TaskEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  task: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (updatedTask: any) => void;
}




export function TaskEditModal({ isOpen, onClose, task, onSave }: TaskEditModalProps) {
  const [editedTask, setEditedTask] = useState(task);
  const commonClasses = 'border border-solid hover:border-yellow-400'
  const router = useRouter();
  const handleSave = () => {
    onSave(editedTask);
    onClose();
    router.push('/');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='h-auto'>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-5">
          <Input
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            placeholder="Title"
            required
            className={`${commonClasses}`}
          />
          <Textarea
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            placeholder="Detail"
            className={`${commonClasses} h-auto`}
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline"  className={`${commonClasses}`}>
                {editedTask.dueDate ? format(new Date(editedTask.dueDate), "PPP") : <span>期日</span>}
                <CalendarIcon className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={new Date(editedTask.dueDate)}
                onSelect={(date) => setEditedTask({ ...editedTask, dueDate: date })}
                initialFocus
                className='bg-white'
              />
            </PopoverContent>
          </Popover>
          <Button type="submit"  className={`ml-2 ${commonClasses}`}>Save Task</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

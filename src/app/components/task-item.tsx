import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/app/components/ui/card"
import { format, isAfter, parseISO } from "date-fns"
import { TaskEditModal } from '@/src/app/components/taskEditModal'
import { useState } from 'react'
import { SiJetpackcompose } from "react-icons/si";
import { BsPencilSquare } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { useRouter } from "next/navigation";

interface Task {
  id: string
  title: string
  description: string
  dueDate: string
  status: string
}

export function TaskItem({ task, onTaskUpdated }: { task: Task; onTaskUpdated: () => void }) {
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const statusColor = {
    '完了': ' border-b-2 border-green-500',
    '期限切れ': 'border-b-2 border-red-500',
    '未完了': 'border-b-2 border-yellow-500',
  }[task.status]

  const statusBGColor = {
    '完了': ' hover:bg-green-50',
    '期限切れ': 'hover:bg-red-50',
    '未完了': 'hover:bg-yellow-50',
  }[task.status]

  const handleTaskClick = () => {
    setIsEditModalOpen(true);
  };

  function isTaskExpired(dueDate: string): boolean {
    const parsedDueDate = parseISO(dueDate);
    const currentDate = new Date();
    return isAfter(currentDate, parsedDueDate);
  }

  const updateTaskStatus = async (taskId: string, newStatus: string) => {   
    if (newStatus === '未完了' && isTaskExpired(task.dueDate)) {
      newStatus = '期限切れ';
    }
    const response = await fetch('/api/tasks', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: taskId, status: newStatus }),
    });
    
    if (response.ok) {
      onTaskUpdated();
      router.push('/');
    }
  };
  
  const handleDeleteTask = async (taskId: string) => {
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: 'DELETE',
    });
  
    if (response.ok) {
      onTaskUpdated();
      router.push('/');
    } else {
      console.error('Failed to delete task');
    }
  };

  const handleSaveTask = async (updatedTask: Task) => {
    console.log("handleSaveTask")
    const response = await fetch(`/api/tasks/${updatedTask.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    });

    if (response.ok) {
      router.push('/');
      onTaskUpdated();
    }
  };
  
  return (
    <>
    <Card className={`w-60 h-52 mt-0 min-h-30 relative ${statusBGColor}`}>
      <CardHeader className="pb-1">
        <CardTitle className="flex justify-between items-center text-ellipsis line-clamp-1 break-words text-2xl text-gray-600">
          {task.title}
        </CardTitle>
      </CardHeader>
      <CardContent >
        <p className="line-clamp-4 break-words text-ellipsis">{task.description}</p>
        <CardDescription className="mt-2 absolute bottom-4 flex  items-end">
          <p className={`text-gray-500 mt-0.5 border-b-2 ${statusColor}`}>
          {format(new Date(task.dueDate), "yyyy/MM/dd")}
          </p>
        <SiJetpackcompose
          className="text-gray-700 mt-1 size-4 ml-14 mb-0.5 cursor-pointer hover:opacity-70"
          onClick={() => updateTaskStatus(task.id, task.status === '完了' ? '未完了' : '完了')}
        ></SiJetpackcompose>
          <BsPencilSquare className="cursor-pointer hover:opacity-30 size-4 text-gray-700 ml-3 mb-0.5" onClick={handleTaskClick}/> 
          <AiOutlineDelete className="cursor-pointer hover:opacity-30 size-4 text-gray-700 ml-3 mb-0.5" onClick={() => handleDeleteTask(task.id)}/>
        </CardDescription>
      </CardContent>
    </Card>
    <TaskEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={task}
        onSave={handleSaveTask}
      />
    </>
  )
}

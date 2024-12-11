import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/app/components/ui/card"
import { Badge } from "@/src/app/components/ui/badge"
// import { Button } from "@/src/app/components/ui/button"
import { format, isAfter, parseISO } from "date-fns"


interface Task {
  id: string
  title: string
  description: string
  dueDate: string
  status: string
}

export function TaskItem({ task, onTaskUpdated }: { task: Task; onTaskUpdated: () => void }) {
  const statusColor = {
    '完了': 'bg-green-500',
    '期限切れ': 'bg-red-500',
    '未完了': 'bg-yellow-500',
  }[task.status]

  function isTaskExpired(dueDate: string): boolean {
    const parsedDueDate = parseISO(dueDate);
    const currentDate = new Date();
    return isAfter(currentDate, parsedDueDate);
  }

  const updateTaskStatus = async (taskId: string, newStatus: string) => {
    if (newStatus === '未完了' && isTaskExpired(task.dueDate)) {
      // alert('このタスクは期限切れです！');
      newStatus = '期限切れ';
    }
  
    const response = await fetch('/api/tasks', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: taskId, status: newStatus }),
    });
  
    if (response.ok) {
      onTaskUpdated();
    }
  };
  
  return (
    <Card className="w-60 h-52 mt-0 min-h-30 relative">
      <CardHeader className="pb-1">
        <CardTitle className="flex justify-between items-center text-ellipsis line-clamp-1 break-words text-2xl">
        {/* <CardTitle className="flex justify-between items-center line-clamp-3 overflow-hidden text-ellipsis"> */}
          {task.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-4 break-words text-ellipsis">{task.description}</p>
        {/* <div className="flex gap-2"> */}
        <CardDescription className="mt-2 absolute bottom-4 flex gap-2">
        {/* <CardDescription className="text-gray-500 mt-2 absolute bottom-4"> */}
          <p className="text-gray-500">
          期限: {format(new Date(task.dueDate), "yyyy/MM/dd")}
          </p>
        {/* <Badge
          className={statusColor}
          // onClick={}
        >
          {task.status}
        </Badge> */}
        <Badge
          className={`${statusColor} cursor-pointer`}
          onClick={() => updateTaskStatus(task.id, task.status === '完了' ? '未完了' : '完了')}
          >
          {task.status}
        </Badge>
        </CardDescription>
        {/* </div> */}
      </CardContent>
    </Card>
  )
}



// import React, { useState } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/app/components/ui/card";
// import { Badge } from "@/src/app/components/ui/badge";
// import { format } from "date-fns";
// import { TaskEditModal } from '@/src/app/components/taskEditModal';

// interface Task {
//   id: string;
//   title: string;
//   description: string;
//   dueDate: string;
//   status: string;
// }

// export function TaskItem({ task, onTaskUpdated }: { task: Task; onTaskUpdated: () => void }) {
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);

//   const statusColor = {
//     '完了': 'bg-green-500',
//     '期限切れ': 'bg-red-500',
//     '未完了': 'bg-yellow-500',
//   }[task.status];

//   const handleTaskClick = () => {
//     setIsEditModalOpen(true);
//   };

//   const handleSaveTask = async (updatedTask: Task) => {
//     // ここでAPIを呼び出してタスクを更新
//     const response = await fetch(`/api/tasks/${updatedTask.id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(updatedTask),
//     });

//     if (response.ok) {
//       onTaskUpdated();
//     }
//   };

//   return (
//     <>
//       <Card className="w-60 h-52 mt-0 min-h-30 relative cursor-pointer" onClick={handleTaskClick}>
//         <CardHeader>
//           <CardTitle className="flex justify-between items-center">
//             {task.title}
//             <Badge className={`${statusColor} cursor-pointer`}>
//               {task.status}
//             </Badge>
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="line-clamp-3 overflow-hidden text-ellipsis">{task.description}</p>
//           <CardDescription className="text-gray-500 mt-2 absolute bottom-2">
//             期限: {format(new Date(task.dueDate), "yyyy/MM/dd")}
//           </CardDescription>
//         </CardContent>
//       </Card>
//       <TaskEditModal
//         isOpen={isEditModalOpen}
//         onClose={() => setIsEditModalOpen(false)}
//         task={task}
//         onSave={handleSaveTask}
//       />
//     </>
//   );
// }

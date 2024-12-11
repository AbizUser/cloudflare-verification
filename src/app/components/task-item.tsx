import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/app/components/ui/card"
import { Badge } from "@/src/app/components/ui/badge"
// import { Button } from "@/src/app/components/ui/button"
import { format, isAfter, parseISO } from "date-fns"
import { AlertTriangleIcon } from 'lucide-react'
import { TaskEditModal } from '@/src/app/components/taskEditModal'
import { useState } from 'react'

interface Task {
  id: string
  title: string
  description: string
  dueDate: string
  status: string
}

export function TaskItem({ task, onTaskUpdated }: { task: Task; onTaskUpdated: () => void }) {

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const statusColor = {
    '完了': 'text-green-500 bg-gray-100',
    '期限切れ': 'text-red-500 bg-gray-100',
    '未完了': 'text-yellow-500 bg-gray-100',
  }[task.status]

  const handleTaskClick = () => {
    setIsEditModalOpen(true);
    console.log("handleTaskClick")
  };

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


  const handleSaveTask = async (updatedTask: Task) => {
    // ここでAPIを呼び出してタスクを更新
    console.log("handleSaveTask")
    const response = await fetch(`/api/tasks/${updatedTask.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    });

    if (response.ok) {
      onTaskUpdated();
    }
  };

  // function clickaction(){
  //   console.log("ok")
  // } ビュー全体のクリックとステータスのクリックを分けたい　
  
  return (
    <>
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
        <AlertTriangleIcon className="h-4 w-4 mt-1" />
          <p className="text-gray-500">
          {format(new Date(task.dueDate), "yyyy/MM/dd")}
          </p>
        {/* <Badge
          className={statusColor}
          // onClick={}
        >
          {task.status}
        </Badge> */}
        <Badge
          className={`${statusColor} cursor-pointer hover:opacity-70`}
          onClick={() => updateTaskStatus(task.id, task.status === '完了' ? '未完了' : '完了')}
          >
          {task.status}
        </Badge>
        <Badge>
          <svg xmlns="http://www.w3.org/2000/svg" width="1.1em" height="1.1em" viewBox="0 0 20 20" className="cursor-pointer hover:opacity-30" onClick={handleTaskClick}>
            <path fill="currentColor" d="M19.4 9H16V5.6c0-.6-.4-.6-1-.6s-1 0-1 .6V9h-3.4c-.6 0-.6.4-.6 1s0 1 .6 1H14v3.4c0 .6.4.6 1 .6s1 0 1-.6V11h3.4c.6 0 .6-.4.6-1s0-1-.6-1m-12 0H.6C0 9 0 9.4 0 10s0 1 .6 1h6.8c.6 0 .6-.4.6-1s0-1-.6-1m0 5H.6c-.6 0-.6.4-.6 1s0 1 .6 1h6.8c.6 0 .6-.4.6-1s0-1-.6-1m0-10H.6C0 4 0 4.4 0 5s0 1 .6 1h6.8C8 6 8 5.6 8 5s0-1-.6-1">
            </path>
          </svg>        
        </Badge>
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



// export function EntypoAddToList(props) {
  // return (
    
  // )
// }



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

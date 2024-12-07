// 'use client'

// import { useState } from 'react'
// import { TaskForm } from './components/task-form'
// import { TaskList } from './components/task-list'
// import { Sidebar } from './components/sidebar'
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/src/app/components/ui/dialog"
// import { Button } from "@/src/app/components/ui/button"
// import { PlusIcon } from 'lucide-react'

// export default function Home() {
//   const [currentView, setCurrentView] = useState<'all' | 'expired' | 'completed'>('all')
//   const [isFormOpen, setIsFormOpen] = useState(false)

//   const handleTaskAdded = () => {
//     setIsFormOpen(false)
//   }
//   const handleCreateTask = () => {
//     setIsFormOpen(true)
//   }

//   return (
//     <div className="flex">
//       <Sidebar onViewChange={setCurrentView} onCreateTask={handleCreateTask} />
//       <main className="flex-1 p-4">
//         {/* サイドバーに対して以下の処理をモバイル利用時に呼び出したいので関数として定義してモバイル側で呼び出したい */}
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-2xl font-bold">一覧表示</h1>
//           <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
//             <DialogTrigger asChild>
//               <Button>
//                 <PlusIcon className="mr-2 h-4 w-4" />
//                 新規タスク
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>新規タスクの追加</DialogTitle>
//               </DialogHeader>
//               <TaskForm onTaskAdded={handleTaskAdded} />
//             </DialogContent>
//           </Dialog>
//         </div>
//         <TaskList view={currentView} />
//       </main>
//     </div>
//   )
// }



'use client'

import { useState } from 'react'
import { TaskForm } from './components/task-form'
import { TaskList } from './components/task-list'
import { Sidebar } from './components/sidebar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/src/app/components/ui/dialog"
import { Button } from "@/src/app/components/ui/button"
import { PlusIcon } from 'lucide-react'

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
      <main className="flex-1 p-4">
        <div className="flex justify-between items-center mb-4">
          {/* <h1 className="text-2xl font-bold">一覧表示</h1> */}
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              {/* <Button onClick={handleCreateTask}>
                <PlusIcon className="mr-2 h-4 w-4" />
                新規タスク
              </Button> */}
            </DialogTrigger>
            <DialogContent z-50>
              <DialogHeader>
                <DialogTitle>新規タスクの追加</DialogTitle>
              </DialogHeader>
              <TaskForm onTaskAdded={handleTaskAdded}/>
            </DialogContent>
          </Dialog>
        </div>
        <TaskList view={currentView} />
      </main>
    </div>
  )
}




// 'use client'

// import { useState } from 'react'
// import { TaskForm } from './components/task-form'
// import { TaskList } from './components/task-list'
// import { Sidebar } from './components/sidebar'
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/src/app/components/ui/dialog"
// import { Button } from "@/src/app/components/ui/button"
// import { PlusIcon } from 'lucide-react'
// import { useTaskDialog } from '../hooks/useTaskDialog'

// export default function Home() {
//   const [currentView, setCurrentView] = useState<'all' | 'expired' | 'completed'>('all')
//   const { isFormOpen, setIsFormOpen, handleCreateTask, handleTaskAdded } = useTaskDialog()

//   return (
//     <div className="flex">
//       <Sidebar onViewChange={setCurrentView} onCreateTask={handleCreateTask} />
//       <main className="flex-1 p-4">
//         <div className="flex justify-between items-center mb-4">
//           {/* <h1 className="text-2xl font-bold">一覧表示</h1> */}
//           <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
//             <DialogTrigger asChild>
//               <Button onClick={handleCreateTask}>
//                 <PlusIcon className="mr-2 h-4 w-4" />
//                 新規タスク
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>新規タスクの追加</DialogTitle>
//               </DialogHeader>
//               <TaskForm onTaskAdded={handleTaskAdded} />
//             </DialogContent>
//           </Dialog>
//         </div>
//         <TaskList view={currentView} />
//       </main>
//     </div>
//   )
// }
'use client'

import { Button } from "@/src/app/components/ui/button"
import { ListIcon, AlertTriangleIcon, CheckCircle, PlusCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

interface SidebarProps {
  onViewChange: (view: 'all' | 'expired' | 'completed') => void
  onCreateTask: () => void
}

export function Sidebar({ onViewChange, onCreateTask }: SidebarProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const buttonClass = isMobile 
    ? "w-12 h-12 justify-center" 
    : "w-full justify-start"

  return (
    <div className={`${isMobile ? 'w-16 p-0 pt-16' : 'w-44 p-4'}  bg-gray-100 h-screen`}>
      {!isMobile && <h2 className="text-xl font-bold mb-4 ml-2">TaskManager</h2>}
      <div className="space-y-2">
        <Button
          // className={buttonClass}
          className="buttonClass"
          // className={isMobile ? "buttonClass" : "hidden" }
          variant="ghost"
          onClick={onCreateTask}
        >
          <PlusCircle className={isMobile ? "h-6 w-4" : "mr-2 h-4 w-4"} />
          {!isMobile && "Add Task"}
        </Button>
        <Button
          className={buttonClass}
          variant="ghost"
          onClick={() => onViewChange('all')}
        >
          <ListIcon className={isMobile ? "h-6 w-6" : "mr-2 h-4 w-4"} />
          {!isMobile && "All"}
        </Button>
        <Button
          className={buttonClass}
          variant="ghost"
          onClick={() => onViewChange('expired')}
        >
          <AlertTriangleIcon className={isMobile ? "h-6 w-6" : "mr-2 h-4 w-4"} />
          {!isMobile && "Expired"}
        </Button>
        <Button
          className={buttonClass}
          variant="ghost"
          onClick={() => onViewChange('completed')}
        >
          <CheckCircle className={isMobile ? "h-6 w-6" : "mr-2 h-4 w-4"} />
          {!isMobile && "Completed"}
        </Button>
      </div>
    </div>
  )
}











// 'use client'
// import { Button } from "@/src/app/components/ui/button"
// import { ListIcon, AlertTriangleIcon, CheckCircle } from 'lucide-react'

// {/* <Button>
// <PlusIcon className="mr-2 h-4 w-4" />
// 新規タスク
// </Button> */}


// interface SidebarProps {
//   onViewChange: (view: 'all' | 'expired' | 'completed') => void
// }

// export function Sidebar({ onViewChange }: SidebarProps) {
//   return (
//     <div className="w-60 p-4 bg-gray-100 h-screen">
//       <h2 className="font-bold mb-4 sm:text-xl">TaskMng</h2>
//       <div className="space-y-2">
//         <Button
//           className="w-full justify-start"
//           variant="ghost"
//           onClick={() => onViewChange('all')}
//         >
//           <ListIcon className="mr-2 h-4 w-4 text-sm" />
//           All
//         </Button>
//         <Button
//           className="w-full justify-start"
//           variant="ghost"
//           onClick={() => onViewChange('expired')}
//         >
//           <AlertTriangleIcon className="mr-2 h-4 w-4" />
//           Expired
//         </Button>
//         <Button
//           className="w-full justify-start"
//           variant="ghost"
//           onClick={() => onViewChange('completed')}
//         >
//           {/* <AlertTriangleIcon className="mr-2 h-4 w-4" /> */}
//           <CheckCircle className="mr-2 h-4 w-4" />
//           Completed
//         </Button>
//       </div>
//     </div>
//   )
// }












// 'use client'
// import { Button } from "@/src/app/components/ui/button"
// import { ListIcon, AlertTriangleIcon, CheckCircle, PlusCircle } from 'lucide-react'
// import { useState, useEffect } from 'react'

// interface SidebarProps {
//   onViewChange: (view: 'all' | 'expired' | 'completed') => void
//   onCreateTask: () => void
// }

// export function Sidebar({ onViewChange, onCreateTask }: SidebarProps) {
//   const [isMobile, setIsMobile] = useState(false)

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768)
//     handleResize()
//     window.addEventListener('resize', handleResize)
//     return () => window.removeEventListener('resize', handleResize)
//   }, [])

//   const buttonClass = isMobile 
//     ? "w-12 h-12 justify-center" 
//     : "w-full justify-start"

//   return (
//     <div className={`${isMobile ? 'w-16 p-0 pt-16' : 'w-64 p-4'}  bg-gray-100 h-screen`}>
//       {!isMobile && <h2 className="text-xl font-bold mb-4 ml-2">{isMobile ? "TaskManager" : "タスク管理アプリ"}</h2>}
//       <div className="space-y-2">
//         {isMobile && (
//           <Button
//             className={buttonClass}
//             variant="ghost"
//             onClick={onCreateTask}
//           >
//             <PlusCircle className="h-6 w-6" />
//           </Button>
//         )}
//         <Button
//           className={buttonClass}
//           variant="ghost"
//           onClick={() => onViewChange('all')}
//         >
//           <ListIcon className={isMobile ? "h-6 w-6" : "mr-2 h-4 w-4"} />
//           {!isMobile && (isMobile ? "All" : "全タスク")}
//         </Button>
//         <Button
//           className={buttonClass}
//           variant="ghost"
//           onClick={() => onViewChange('expired')}
//         >
//           <AlertTriangleIcon className={isMobile ? "h-6 w-6" : "mr-2 h-4 w-4"} />
//           {!isMobile && (isMobile ? "Expired" : "期限切れタスク")}
//         </Button>
//         <Button
//           className={buttonClass}
//           variant="ghost"
//           onClick={() => onViewChange('completed')}
//         >
//           <CheckCircle className={isMobile ? "h-6 w-6" : "mr-2 h-4 w-4"} />
//           {!isMobile && (isMobile ? "Completed" : "完了タスク")}
//         </Button>
//       </div>
//     </div>
//   )
// }
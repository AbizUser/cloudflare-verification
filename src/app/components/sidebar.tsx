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
  const [currentView, setCurrentView] = useState<'all' | 'expired' | 'completed'>('all')
  const commonColor = 'bg-white rounded-none border-r-purple-300 border-r-2';

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const buttonClass = isMobile 
    ? "w-full max-w-14 h-12 flex justify-center items-center" 
    : "w-full flex justify-start items-center px-4 py-2" 

  const handleViewChange = (view: 'all' | 'expired' | 'completed') => {
    setCurrentView(view)
    onViewChange(view)
  }

//   //mainとサイドバーの縦幅を比較して広い方をサイドバーに反映させる
function adjustSidebarHeight() {
  const mainElement = document.querySelector<HTMLElement>('.width');
  const sidebarElement = document.querySelector<HTMLElement>('.sidebar');
  if (!mainElement || !sidebarElement) return;

  const mainHeight = mainElement.offsetHeight;
  const screenHeight = window.innerHeight;
  const newHeight = Math.max(mainHeight, screenHeight);

  sidebarElement.style.height = newHeight + 'px';
}
// ページ読み込み時とリサイズ時に関数を呼び出す
document.addEventListener('DOMContentLoaded', adjustSidebarHeight);
window.addEventListener('resize', adjustSidebarHeight);

  return (
    <div className={`sidebar ${isMobile ? 'max-w-14 min-w-14 p-0 pt-16' : 'w-42'} bg-gray-100 flex flex-col h-screen`}>
      {!isMobile && <h2 className={`text-xl font-bold mb-4 px-4 pt-4 text-gray-600`}>TaskManager</h2>}
      <div className="w-full space-y-2 mt-4">
        <Button
          className={`${buttonClass} ${'hover:bg-slate-50'}`}
          variant="ghost"
          onClick={onCreateTask}
        >
          <PlusCircle className={isMobile ? "h-4 w-6" : "mr-2 h-4 w-4"} />
          {!isMobile && "Add Task"}
        </Button>
        <Button
          className={`${buttonClass} ${currentView === 'all' ? `${commonColor}` : 'hover:bg-slate-50'} !m-0`}
          variant="ghost"
          onClick={() => handleViewChange('all')}
        >
          <ListIcon className={isMobile ? "h-6 w-6" : "mr-2 h-4 w-4"} />
          {!isMobile && "All"}
        </Button>
        <Button
          className={`${buttonClass} ${currentView === 'expired' ? `${commonColor}` : 'hover:bg-slate-50'} !m-0`}
          variant="ghost"
          onClick={() => handleViewChange('expired')}
        >
          <AlertTriangleIcon className={isMobile ? "h-6 w-6" : "mr-2 h-4 w-4"} />
          {!isMobile && "Expired"}
        </Button>
        <Button
          className={`${buttonClass} ${currentView === 'completed' ? `${commonColor}` : 'hover:bg-slate-50'} !m-0`}
          variant="ghost"
          onClick={() => handleViewChange('completed')}
        >
          <CheckCircle className={isMobile ? "h-6 w-6" : "mr-2 h-4 w-4"} />
          {!isMobile && "Completed"}
        </Button>
      </div>
    </div>
  )
}
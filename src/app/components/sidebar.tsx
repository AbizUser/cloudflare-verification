'use client'

import { Button } from "@/components/ui/button"
import { ListIcon, AlertTriangleIcon, CheckCircle } from 'lucide-react'

interface SidebarProps {
  onViewChange: (view: 'all' | 'expired' | 'completed') => void
}

export function Sidebar({ onViewChange }: SidebarProps) {
  return (
    <div className="w-64 p-4 bg-gray-100 h-screen">
      <h2 className="text-xl font-bold mb-4">タスク管理アプリ</h2>
      <div className="space-y-2">
        <Button
          className="w-full justify-start"
          variant="ghost"
          onClick={() => onViewChange('all')}
        >
          <ListIcon className="mr-2 h-4 w-4" />
          全タスク
        </Button>
        <Button
          className="w-full justify-start"
          variant="ghost"
          onClick={() => onViewChange('expired')}
        >
          <AlertTriangleIcon className="mr-2 h-4 w-4" />
          期限切れタスク
        </Button>
        <Button
          className="w-full justify-start"
          variant="ghost"
          onClick={() => onViewChange('completed')}
        >
          {/* <AlertTriangleIcon className="mr-2 h-4 w-4" /> */}
          <CheckCircle className="mr-2 h-4 w-4" />
          完了タスク
        </Button>
      </div>
    </div>
  )
}


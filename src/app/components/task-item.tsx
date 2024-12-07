import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

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

  return (
    <Card className="max-w-60 mt-0 min-h-30">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {task.title}
          <Badge className={statusColor}>{task.status}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{task.description}</p>
        <CardDescription className="text-gray-500 mt-2">期限: {format(new Date(task.dueDate), "PPP")}</CardDescription>
      </CardContent>
    </Card>
  )
}


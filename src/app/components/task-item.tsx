// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/app/components/ui/card"
// import { Badge } from "@/src/app/components/ui/badge"
// import { format } from "date-fns"

// interface Task {
//   id: string
//   title: string
//   description: string
//   dueDate: string
//   status: string
// }

// export function TaskItem({ task, onTaskUpdated }: { task: Task; onTaskUpdated: () => void }) {
//   const statusColor = {
//     '完了': 'bg-green-500',
//     '期限切れ': 'bg-red-500',
//     '未完了': 'bg-yellow-500',
//   }[task.status]

//   return (
//     <Card className="w-60 h-52 mt-0 min-h-30">
//     {/* <Card className="w-72 h-60 mt-0 min-h-30"> */}
//       <CardHeader>
//         <CardTitle className="flex justify-between items-center ">
//           {task.title}
//           <Badge className={statusColor}>{task.status}</Badge>
//           {/* バッジに関してボタンにしてクリックしたらステータスが切り変えられるようにしてもいいかも */}
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <p>{task.description}</p>
//         <CardDescription className="text-gray-500 mt-2">期限: {format(new Date(task.dueDate), "PPP")}</CardDescription>
//       </CardContent>
//     </Card>
//   )
// }




import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/app/components/ui/card"
import { Badge } from "@/src/app/components/ui/badge"
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
    <Card className="w-60 h-52 mt-0 min-h-30 relative">
      <CardHeader>
        <CardTitle className="flex justify-between items-center line-clamp-3 overflow-hidden text-ellipsis">
          {task.title}
          <Badge className={statusColor}>{task.status}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 overflow-hidden text-ellipsis">{task.description}</p>
        <CardDescription className="text-gray-500 mt-2 absolute bottom-4">
          期限: {format(new Date(task.dueDate), "yyyy/MM/dd")}
        </CardDescription>
      </CardContent>
    </Card>
  )
}
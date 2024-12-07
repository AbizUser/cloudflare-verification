import { isAfter } from 'date-fns'
export function getTaskStatus(dueDate: Date, completed: boolean): '完了' | '期限切れ' | '未完了' {
  if (completed) return '完了'
  return isAfter(new Date(), dueDate) ? '期限切れ' : '未完了'
}
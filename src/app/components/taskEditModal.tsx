import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/app/components/ui/dialog";
import { Button } from "@/src/app/components/ui/button";
import { Input } from "@/src/app/components/ui/input";
import { Textarea } from "@/src/app/components/ui/textarea";

interface TaskEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: any
  onSave: (updatedTask: any) => void;
}

export function TaskEditModal({ isOpen, onClose, task, onSave }: TaskEditModalProps) {
  const [editedTask, setEditedTask] = useState(task);

  const handleSave = () => {
    onSave(editedTask);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>タスクの編集</DialogTitle>
        </DialogHeader>
        <Input
          value={editedTask.title}
          onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
          placeholder="タイトル"
        />
        <Textarea
          value={editedTask.description}
          onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
          placeholder="説明"
        />
        <Input
          type="date"
          value={editedTask.dueDate.split('T')[0]}
          onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
        />
        <Button onClick={handleSave}>保存</Button>
      </DialogContent>
    </Dialog>
  );
}

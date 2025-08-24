"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2 } from "lucide-react"
import type { Todo } from "./todo-list"
import { cn } from "@/lib/utils"

interface TodoItemProps {
  todo: Todo
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center gap-3 p-3 border rounded-lg bg-card" data-testid={`todo-item-${todo.id}`}>
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
        data-testid={`todo-checkbox-${todo.id}`}
      />
      <span
        className={cn("flex-1 cursor-pointer", todo.completed && "line-through text-muted-foreground")}
        onClick={() => onToggle(todo.id)}
        data-testid={`todo-text-${todo.id}`}
      >
        {todo.text}
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(todo.id)}
        className="text-destructive hover:text-destructive"
        data-testid={`delete-button-${todo.id}`}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}

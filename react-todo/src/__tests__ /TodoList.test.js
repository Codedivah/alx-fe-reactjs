"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AddTodoForm } from "./add-todo-form"
import { TodoItem } from "./todo-item"

export interface Todo {
  id: number
  text: string
  completed: boolean
}

const initialTodos: Todo[] = [
  { id: 1, text: "Learn React", completed: true },
  { id: 2, text: "Build a todo app", completed: false },
  { id: 3, text: "Write tests", completed: false },
]

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos)

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    }
    setTodos([...todos, newTodo])
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Tasks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <AddTodoForm onAddTodo={addTodo} />
        <div className="space-y-2" data-testid="todo-list">
          {todos.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No todos yet. Add one above!</p>
          ) : (
            todos.map((todo) => <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />)
          )}
        </div>
      </CardContent>
    </Card>
  )
}

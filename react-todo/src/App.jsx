import { useState } from "react"
import TodoList from "./components/TodoList"
import AddTodoForm from "./components/AddTodoForm"

const initialTodos = [
  { id: 1, text: "Learn React Router", completed: false },
  { id: 2, text: "Build a Todo app", completed: true },
  { id: 3, text: "Push to GitHub", completed: false },
]

export default function App() {
  const [todos, setTodos] = useState(initialTodos)

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      text,
      completed: false,
    }
    setTodos((prev) => [newTodo, ...prev])
  }

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div style={{ maxWidth: 520, margin: "40px auto", fontFamily: "system-ui" }}>
      <h1>Todo List</h1>
      <AddTodoForm onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  )
}

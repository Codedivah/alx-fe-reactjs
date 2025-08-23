import { useState } from "react"

export default function AddTodoForm({ onAdd }) {
  const [text, setText] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    const value = text.trim()
    if (!value) return
    onAdd(value)
    setText("")
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo"
        style={{ flex: 1, padding: 8, borderRadius: 8, border: "1px solid #ccc" }}
      />
      <button type="submit" style={{ padding: "8px 12px", borderRadius: 8 }}>
        Add
      </button>
    </form>
  )
}

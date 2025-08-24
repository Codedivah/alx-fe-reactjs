export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 12px",
        border: "1px solid #eee",
        borderRadius: 10,
        marginBottom: 8,
        background: "#fff",
      }}
    >
      <button
        onClick={() => onToggle(todo.id)}
        title="Toggle complete"
        style={{
          all: "unset",
          cursor: "pointer",
          textDecoration: todo.completed ? "line-through" : "none",
          opacity: todo.completed ? 0.6 : 1,
        }}
      >
        {todo.text}
      </button>

      <button
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete ${todo.text}`}
        style={{
          padding: "4px 8px",
          borderRadius: 8,
          border: "1px solid #ddd",
          cursor: "pointer",
          background: "#fafafa",
        }}
      >
        Delete
      </button>
    </li>
  )
}

import React from "react";

function TodoList({ todos, onToggle, onDelete }) {
  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Todo List</h2>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center mb-2"
          >
            <span
              onClick={() => onToggle(todo.id)}
              className={`cursor-pointer ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => onDelete(todo.id)}
              className="bg-red-500 text-white px-2 py-1 rounded text-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;

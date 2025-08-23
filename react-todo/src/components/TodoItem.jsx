import React from 'react';
import { Check, X, Trash2 } from 'lucide-react';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div 
      className={`flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border transition-all duration-200 hover:shadow-md ${
        todo.completed ? 'bg-gray-50 border-gray-200' : 'border-gray-100'
      }`}
      data-testid="todo-item"
    >
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          todo.completed 
            ? 'bg-green-500 border-green-500 text-white hover:bg-green-600' 
            : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
        }`}
        data-testid="todo-toggle"
      >
        {todo.completed && <Check size={14} />}
      </button>
      
      <span 
        className={`flex-1 cursor-pointer transition-all duration-200 ${
          todo.completed 
            ? 'text-gray-500 line-through' 
            : 'text-gray-800 hover:text-gray-600'
        }`}
        onClick={() => onToggle(todo.id)}
        data-testid="todo-text"
      >
        {todo.text}
      </span>
      
      <button
        onClick={() => onDelete(todo.id)}
        className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
        data-testid="todo-delete"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default TodoItem;
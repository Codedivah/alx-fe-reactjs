import React, { useState } from 'react';
import { CheckCircle2, Circle, ListTodo } from 'lucide-react';
import { Todo } from '../types';
import AddTodoForm from './AddTodoForm';
import TodoItem from './TodoItem';

const initialTodos: Todo[] = [
  {
    id: '1',
    text: 'Learn React Testing Library',
    completed: false,
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    text: 'Write comprehensive tests',
    completed: true,
    createdAt: new Date('2024-01-14')
  },
  {
    id: '3',
    text: 'Build a todo app',
    completed: false,
    createdAt: new Date('2024-01-13')
  }
];

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date()
    };
    setTodos(prev => [...prev, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="max-w-2xl mx-auto p-6" data-testid="todo-list">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <ListTodo className="text-blue-500" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">Todo List</h1>
        </div>
        <p className="text-gray-600">
          {completedCount} of {totalCount} tasks completed
        </p>
      </div>

      {/* Add Todo Form */}
      <AddTodoForm onAddTodo={addTodo} />

      {/* Todo Items */}
      {todos.length === 0 ? (
        <div className="text-center py-12">
          <Circle className="mx-auto mb-4 text-gray-300" size={48} />
          <p className="text-gray-500 text-lg">No todos yet</p>
          <p className="text-gray-400 text-sm">Add your first task above!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
        </div>
      )}

      {/* Stats */}
      {todos.length > 0 && (
        <div className="mt-6 flex justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Circle size={16} />
            <span>{totalCount - completedCount} pending</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 size={16} />
            <span>{completedCount} completed</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
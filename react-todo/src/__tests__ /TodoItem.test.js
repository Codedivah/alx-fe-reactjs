import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import TodoItem from '../components/TodoItem';
import { Todo } from '../types';

describe('TodoItem Component', () => {
  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();

  const incompleteTodo: Todo = {
    id: '1',
    text: 'Test todo',
    completed: false,
    createdAt: new Date()
  };

  const completedTodo: Todo = {
    id: '2',
    text: 'Completed todo',
    completed: true,
    createdAt: new Date()
  };

  beforeEach(() => {
    mockOnToggle.mockClear();
    mockOnDelete.mockClear();
  });

  test('renders incomplete todo correctly', () => {
    render(
      <TodoItem 
        todo={incompleteTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );

    expect(screen.getByText('Test todo')).toBeInTheDocument();
    expect(screen.getByText('Test todo')).not.toHaveClass('line-through');
  });

  test('renders completed todo correctly', () => {
    render(
      <TodoItem 
        todo={completedTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );

    expect(screen.getByText('Completed todo')).toBeInTheDocument();
    expect(screen.getByText('Completed todo')).toHaveClass('line-through');
  });

  test('calls onToggle when toggle button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <TodoItem 
        todo={incompleteTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );

    await user.click(screen.getByTestId('todo-toggle'));

    expect(mockOnToggle).toHaveBeenCalledWith('1');
  });

  test('calls onToggle when text is clicked', async () => {
    const user = userEvent.setup();
    render(
      <TodoItem 
        todo={incompleteTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );

    await user.click(screen.getByTestId('todo-text'));

    expect(mockOnToggle).toHaveBeenCalledWith('1');
  });

  test('calls onDelete when delete button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <TodoItem 
        todo={incompleteTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );

    await user.click(screen.getByTestId('todo-delete'));

    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });

  test('shows check icon for completed todos', () => {
    render(
      <TodoItem 
        todo={completedTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );

    const toggleButton = screen.getByTestId('todo-toggle');
    expect(toggleButton.querySelector('svg')).toBeInTheDocument();
  });

  test('does not show check icon for incomplete todos', () => {
    render(
      <TodoItem 
        todo={incompleteTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );

    const toggleButton = screen.getByTestId('todo-toggle');
    expect(toggleButton.querySelector('svg')).toBeNull();
  });
});
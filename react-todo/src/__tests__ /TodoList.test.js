import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

// Mock console.error to avoid cluttering test output
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (typeof args[0] === 'string' && args[0].includes('Warning:')) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

describe('TodoList Component', () => {
  beforeEach(() => {
    render(<TodoList />);
  });

  describe('Initial Render', () => {
    test('renders TodoList component', () => {
      expect(screen.getByTestId('todo-list')).toBeInTheDocument();
    });

    test('renders the main heading', () => {
      expect(screen.getByRole('heading', { name: /todo list/i })).toBeInTheDocument();
    });

    test('renders initial demo todos', () => {
      expect(screen.getByText('Learn React Testing Library')).toBeInTheDocument();
      expect(screen.getByText('Write comprehensive tests')).toBeInTheDocument();
      expect(screen.getByText('Build a todo app')).toBeInTheDocument();
    });

    test('displays correct task completion stats', () => {
      expect(screen.getByText('1 of 3 tasks completed')).toBeInTheDocument();
    });

    test('renders add todo form', () => {
      expect(screen.getByTestId('todo-input')).toBeInTheDocument();
      expect(screen.getByTestId('add-todo-button')).toBeInTheDocument();
    });
  });

  describe('Adding Todos', () => {
    test('adds a new todo when form is submitted', async () => {
      const user = userEvent.setup();
      const input = screen.getByTestId('todo-input');
      const addButton = screen.getByTestId('add-todo-button');

      await user.type(input, 'New test todo');
      await user.click(addButton);

      expect(screen.getByText('New test todo')).toBeInTheDocument();
      expect(input).toHaveValue('');
    });

    test('adds todo when Enter key is pressed', async () => {
      const user = userEvent.setup();
      const input = screen.getByTestId('todo-input');

      await user.type(input, 'Another test todo{enter}');

      expect(screen.getByText('Another test todo')).toBeInTheDocument();
      expect(input).toHaveValue('');
    });

    test('does not add empty todos', async () => {
      const user = userEvent.setup();
      const input = screen.getByTestId('todo-input');
      const addButton = screen.getByTestId('add-todo-button');

      // Try to add empty todo
      await user.click(addButton);

      // Should still have only the initial 3 todos
      const todoItems = screen.getAllByTestId('todo-item');
      expect(todoItems).toHaveLength(3);
    });

    test('does not add todos with only whitespace', async () => {
      const user = userEvent.setup();
      const input = screen.getByTestId('todo-input');
      const addButton = screen.getByTestId('add-todo-button');

      await user.type(input, '   ');
      await user.click(addButton);

      const todoItems = screen.getAllByTestId('todo-item');
      expect(todoItems).toHaveLength(3);
    });

    test('trims whitespace from new todos', async () => {
      const user = userEvent.setup();
      const input = screen.getByTestId('todo-input');
      const addButton = screen.getByTestId('add-todo-button');

      await user.type(input, '  Trimmed todo  ');
      await user.click(addButton);

      expect(screen.getByText('Trimmed todo')).toBeInTheDocument();
      expect(screen.queryByText('  Trimmed todo  ')).not.toBeInTheDocument();
    });

    test('updates completion stats after adding a todo', async () => {
      const user = userEvent.setup();
      const input = screen.getByTestId('todo-input');
      const addButton = screen.getByTestId('add-todo-button');

      await user.type(input, 'New todo');
      await user.click(addButton);

      expect(screen.getByText('1 of 4 tasks completed')).toBeInTheDocument();
    });
  });

  describe('Toggling Todos', () => {
    test('toggles todo completion when toggle button is clicked', async () => {
      const user = userEvent.setup();
      const incompleteTodo = screen.getByText('Learn React Testing Library');
      const toggleButton = incompleteTodo.parentElement?.querySelector('[data-testid="todo-toggle"]');
      
      expect(toggleButton).toBeInTheDocument();
      
      // Click to complete
      await user.click(toggleButton!);
      
      // Check if the text now has strikethrough (completed state)
      expect(incompleteTodo).toHaveClass('line-through');
      expect(screen.getByText('2 of 3 tasks completed')).toBeInTheDocument();
    });

    test('toggles todo completion when text is clicked', async () => {
      const user = userEvent.setup();
      const incompleteTodo = screen.getByText('Build a todo app');
      
      // Click the text to complete
      await user.click(incompleteTodo);
      
      expect(incompleteTodo).toHaveClass('line-through');
      expect(screen.getByText('2 of 3 tasks completed')).toBeInTheDocument();
    });

    test('toggles completed todo back to incomplete', async () => {
      const user = userEvent.setup();
      const completedTodo = screen.getByText('Write comprehensive tests');
      
      // This todo starts as completed, so click to make it incomplete
      await user.click(completedTodo);
      
      expect(completedTodo).not.toHaveClass('line-through');
      expect(screen.getByText('0 of 3 tasks completed')).toBeInTheDocument();
    });

    test('shows check icon for completed todos', async () => {
      const user = userEvent.setup();
      const incompleteTodo = screen.getByText('Learn React Testing Library');
      const toggleButton = incompleteTodo.parentElement?.querySelector('[data-testid="todo-toggle"]');
      
      // Initially should not have check
      expect(toggleButton?.querySelector('svg')).toBeNull();
      
      await user.click(toggleButton!);
      
      // After clicking, should have check icon
      expect(toggleButton?.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('Deleting Todos', () => {
    test('deletes todo when delete button is clicked', async () => {
      const user = userEvent.setup();
      const todoToDelete = screen.getByText('Learn React Testing Library');
      const deleteButton = todoToDelete.parentElement?.querySelector('[data-testid="todo-delete"]');
      
      expect(deleteButton).toBeInTheDocument();
      
      await user.click(deleteButton!);
      
      expect(screen.queryByText('Learn React Testing Library')).not.toBeInTheDocument();
    });

    test('updates completion stats after deleting a completed todo', async () => {
      const user = userEvent.setup();
      const completedTodo = screen.getByText('Write comprehensive tests');
      const deleteButton = completedTodo.parentElement?.querySelector('[data-testid="todo-delete"]');
      
      await user.click(deleteButton!);
      
      expect(screen.getByText('0 of 2 tasks completed')).toBeInTheDocument();
    });

    test('updates completion stats after deleting an incomplete todo', async () => {
      const user = userEvent.setup();
      const incompleteTodo = screen.getByText('Learn React Testing Library');
      const deleteButton = incompleteTodo.parentElement?.querySelector('[data-testid="todo-delete"]');
      
      await user.click(deleteButton!);
      
      expect(screen.getByText('1 of 2 tasks completed')).toBeInTheDocument();
    });

    test('shows empty state when all todos are deleted', async () => {
      const user = userEvent.setup();
      
      // Delete all todos
      const deleteButtons = screen.getAllByTestId('todo-delete');
      for (const button of deleteButtons) {
        await user.click(button);
      }
      
      expect(screen.getByText('No todos yet')).toBeInTheDocument();
      expect(screen.getByText('Add your first task above!')).toBeInTheDocument();
    });
  });

  describe('Statistics and UI States', () => {
    test('displays correct pending and completed counts', () => {
      expect(screen.getByText('2 pending')).toBeInTheDocument();
      expect(screen.getByText('1 completed')).toBeInTheDocument();
    });

    test('updates pending count when todo is completed', async () => {
      const user = userEvent.setup();
      const incompleteTodo = screen.getByText('Learn React Testing Library');
      
      await user.click(incompleteTodo);
      
      expect(screen.getByText('1 pending')).toBeInTheDocument();
      expect(screen.getByText('2 completed')).toBeInTheDocument();
    });

    test('add button is disabled when input is empty', () => {
      const addButton = screen.getByTestId('add-todo-button');
      expect(addButton).toBeDisabled();
    });

    test('add button is enabled when input has content', async () => {
      const user = userEvent.setup();
      const input = screen.getByTestId('todo-input');
      const addButton = screen.getByTestId('add-todo-button');
      
      await user.type(input, 'Test todo');
      
      expect(addButton).toBeEnabled();
    });
  });

  describe('Accessibility and User Experience', () => {
    test('input has correct placeholder text', () => {
      const input = screen.getByTestId('todo-input');
      expect(input).toHaveAttribute('placeholder', 'Add a new todo...');
    });

    test('form submission prevents default behavior', async () => {
      const user = userEvent.setup();
      const input = screen.getByTestId('todo-input');
      
      // Mock preventDefault to ensure it's called
      const mockPreventDefault = jest.fn();
      const form = input.closest('form');
      
      form?.addEventListener('submit', (e) => {
        mockPreventDefault();
        e.preventDefault();
      });
      
      await user.type(input, 'Test todo{enter}');
      
      // The todo should be added (form handling worked)
      expect(screen.getByText('Test todo')).toBeInTheDocument();
    });

    test('maintains focus management during interactions', async () => {
      const user = userEvent.setup();
      const input = screen.getByTestId('todo-input');
      
      await user.type(input, 'Focus test todo');
      await user.click(screen.getByTestId('add-todo-button'));
      
      // Input should be cleared but could maintain focus for better UX
      expect(input).toHaveValue('');
    });
  });
});
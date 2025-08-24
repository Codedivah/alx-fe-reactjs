import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../components/TodoList";
import "@testing-library/jest-dom";


test("renders initial demo todos", () => {
  render(<TodoList />);
  expect(screen.getByText("Learn React")).toBeInTheDocument();
  expect(screen.getByText("Build Todo App")).toBeInTheDocument(); // ✅ matches component
});

test("can add a new todo", () => {
  render(<TodoList />);
  const input = screen.getByPlaceholderText(/add a new todo/i); // ✅ matches component
  const button = screen.getByText(/add/i);

  fireEvent.change(input, { target: { value: "Test new todo" } });
  fireEvent.click(button);

  expect(screen.getByText("Test new todo")).toBeInTheDocument();
});

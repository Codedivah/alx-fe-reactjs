import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";

describe("TodoList Component", () => {
  test("renders without crashing", () => {
    render(<TodoList />);
    expect(screen.getByText(/Todo List/i)).toBeInTheDocument();
  });

  test("renders initial demo todos", () => {
    render(<TodoList />);
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Build Todo App")).toBeInTheDocument();
  });

  test("adds a new todo when form is submitted", () => {
    render(<TodoList />);

    // Find the input field and button (adjust placeholder/text to match your component)
    const input = screen.getByPlaceholderText(/add a new todo/i);
    const button = screen.getByText(/add todo/i);

    // Simulate typing and clicking "Add"
    fireEvent.change(input, { target: { value: "Write tests" } });
    fireEvent.click(button);

    // Check that the new todo appears in the list
    expect(screen.getByText("Write tests")).toBeInTheDocument();
  });
});

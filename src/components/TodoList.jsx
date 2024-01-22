import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const todos = useSelector((state) => state.todos.todos);
  const todoItems = todos.map((todo) => (
    <TodoItem
      key={todo.id}
      id={todo.id}
      title={todo.title}
      completed={todo.completed}
    ></TodoItem>
  ));
  return <ul className="py-32">{todoItems}</ul>;
}

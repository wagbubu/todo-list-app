import { useSelector, useDispatch } from "react-redux";
import TodoItem from "./TodoItem";
import { fetchTodos } from "../features/todo/todoSlice";
import { useEffect } from "react";

export default function TodoList() {
  const todos = useSelector((state) => state.todos.todos); //check
  const todosStatus = useSelector((state) => state.todos.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (todosStatus == "idle") {
      dispatch(fetchTodos());
    }
  }, [todosStatus, dispatch]);

  return (
    <>
      <ul className="py-32">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
          ></TodoItem>
        ))}
      </ul>
    </>
  );
}

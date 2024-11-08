import { useSelector, useDispatch } from "react-redux";
import TodoItem from "./TodoItem";
import { fetchTodos } from "../features/todoSlice";
import { useEffect } from "react";
import { AppDispatch } from "../app/store";
import { AppState, Todo } from "../types";

export default function TodoList() {
  const todos: Todo[] = useSelector((store: AppState) => store.todos.list);
  const todosStatus = useSelector((store: AppState) => store.todos.status);
  const session = useSelector((state: AppState) => state.session.auth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (todosStatus === "idle") {
      dispatch(fetchTodos({ userId: session.user.id }));
    }
  }, [todosStatus, dispatch]);
  console.table(session);
  return (
    <>
      <ul className="py-20">
        {todos.map((todo) => (
          <TodoItem
            key={todo.task_id}
            task_id={todo.task_id}
            task_name={todo.task_name}
            completed={todo.completed}
            task_description={todo.task_description}
            priority_level={todo.priority_level}
            deadline={todo.deadline}
          ></TodoItem>
        ))}
      </ul>
    </>
  );
}

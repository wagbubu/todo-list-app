import { useSelector, useDispatch } from "react-redux";
import TodoItem from "./TodoItem";
import { fetchTodos } from "../features/todo/todoSlice";
import { useEffect } from "react";
import { State, Todo } from "../features/todo/todoSlice";
import { AppDispatch } from "../app/store";

interface Store {
  todos: State;
}

export default function TodoList() {
  const todos: Todo[] = useSelector((store: Store) => store.todos.list);
  const todosStatus = useSelector((store: Store) => store.todos.status);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (todosStatus == "idle") {
      dispatch(fetchTodos());
    }
  }, [todosStatus, dispatch]);
  console.log(todos);
  return (
    <>
      <ul className="py-32">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id.toString()}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
          ></TodoItem>
        ))}
      </ul>
    </>
  );
}

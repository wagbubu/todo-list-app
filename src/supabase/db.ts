import { Todo, TodoPayload } from "../types";
import supabase from "../../utils/createSupabaseClient";

const fetchTodosSupabase = async (userId: string) => {
  let { data: todos, error } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching todos:", error.message);
  }

  return todos;
};

const addTodoSupabase = async ({
  user_id,
  task_name,
  task_description,
  deadline,
  priority_level,
}: TodoPayload) => {
  const { data, error } = await supabase
    .from("todos")
    .insert([
      { user_id, task_name, task_description, deadline, priority_level },
    ])
    .select();

  if (error) {
    console.error("Error fetching todos:", error.message);
  }
  if (data != null && data.length) {
    const todo = data[0];
    return todo;
  } else {
    throw new Error("Failed To Add Todo");
  }
};

const markCompleteTodoSupabase = async ({
  task_id,
  completed,
}: Pick<Todo, "task_id" | "completed">) => {
  const { data: todo, error } = await supabase
    .from("todos")
    .update({ completed: completed })
    .eq("task_id", task_id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return todo;
};

const deleteTodoSupabase = async (task_id: string) => {
  const { data: todo, error } = await supabase
    .from("todos")
    .delete()
    .eq("task_id", task_id)
    .select();
  if (error) {
    throw new Error(error.message);
  }

  return todo;
};

export {
  fetchTodosSupabase,
  addTodoSupabase,
  markCompleteTodoSupabase,
  deleteTodoSupabase,
};

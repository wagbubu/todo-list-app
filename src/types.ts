import { Session } from "@supabase/supabase-js";
export type PriorityLevel = "LOW" | "NORMAL" | "HIGH" | undefined;
export type Todo = {
  task_id: string;
  task_name: string;
  completed?: boolean;
  task_description?: string;
  deadline?: string;
  priority_level?: PriorityLevel;
  position_index?: number;
};

export type TodoState = {
  list: Todo[];
  showAddForm: boolean;
  status: string;
  error: string | undefined | null;
};

export type AppState = {
  todos: TodoState;
  session: {
    auth: Session;
  };
};

export type TodoPayload = Omit<Todo, "task_id"> & { user_id: string };

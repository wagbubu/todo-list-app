import { TodoState, Todo, TodoPayload } from "../types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addTodoSupabase,
  deleteTodoSupabase,
  fetchTodosSupabase,
  markCompleteTodoSupabase,
} from "../supabase/db";

const initialState: TodoState = {
  list: [],
  showAddForm: false,
  status: "idle",
  error: null,
};

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (payload: { userId: string }) => {
    const data = await fetchTodosSupabase(payload.userId);
    return data;
  }
);

export const addTodoThunk = createAsyncThunk(
  "todos/addTodoThunk",
  async (payload: TodoPayload) => {
    const todo: Todo = await addTodoSupabase(payload);
    return todo;
  }
);

export const markCompleteThunk = createAsyncThunk(
  "todos/markCompleteThunk",
  async (payload: Pick<Todo, "task_id" | "completed">) => {
    const todo = await markCompleteTodoSupabase({
      task_id: payload.task_id,
      completed: payload.completed,
    });
    return todo;
  }
);

export const deleteTodoThunk = createAsyncThunk(
  "todos/deleteTodoThunk",
  async (payload: Pick<Todo, "task_id">) => {
    const todo = await deleteTodoSupabase(payload.task_id);
    return todo;
  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    showAddTodoForm: (state) => {
      state.showAddForm = true;
    },
    hideAddTodoForm: (state) => {
      state.showAddForm = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload) {
          const todos: Todo[] = action.payload;
          state.list = state.list.concat(todos);
        }
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTodoThunk.fulfilled, (state, action) => {
        if (action.payload) {
          const todo: Todo = action.payload;
          state.list.push(todo);
          state.showAddForm = false;
        }
      })
      .addCase(markCompleteThunk.pending, (state) => {
        state.status = "updating";
      })
      .addCase(markCompleteThunk.fulfilled, (state, action) => {
        if (action.payload) {
          const todoId: string = action.payload[0].task_id;
          const index = state.list.findIndex((todo) => todo.task_id == todoId);
          state.list[index].completed = action.payload[0].completed;
        }
        state.status = "updated";
      })
      .addCase(deleteTodoThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.list = state.list.filter(
            (task) => task.task_id !== action.payload[0].task_id
          );
        }
      });
  },
});

export const { showAddTodoForm, hideAddTodoForm } = todoSlice.actions;
export default todoSlice.reducer;

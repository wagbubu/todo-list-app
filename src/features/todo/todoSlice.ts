import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Todo {
  id: Date;
  title: string;
  completed: boolean;
}
export interface State {
  list: Todo[];
  status: string;
  error: string | undefined | null;
}

const initialState: State = {
  list: [],
  status: "idle",
  error: null,
};

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  try {
    const response = await fetch("http://localhost:7000/todos");
    const jsonResponse: Todo[] = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error("Error fetching todos:", error);
    return undefined;
  }
});

export const addTodoThunk = createAsyncThunk(
  "todos/addTodoThunk",
  async (payload: Partial<Omit<Todo, "id" | "completed">>) => {
    try {
      const response = await fetch("http://localhost:7000/todos", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const todo: Todo = await response.json();
        return todo;
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
      return undefined;
    }
  }
);

export const markCompleteThunk = createAsyncThunk(
  "todos/markCompleteThunk",
  async (payload: Partial<Todo>) => {
    try {
      const response = await fetch(
        `http://localhost:7000/todos/${payload.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ completed: payload.completed }),
        }
      );

      if (response.ok) {
        const todo: Todo = await response.json();
        return todo;
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
      return undefined;
    }
  }
);

export const deleteTodoThunk = createAsyncThunk(
  "todos/deleteTodoThunk",
  async (payload: Partial<Omit<Todo, "title" | "completed">>) => {
    try {
      const response = await fetch(
        `http://localhost:7000/todos/${payload.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ id: payload.id }),
        }
      );
      if (response.ok) {
        const todo: Todo[] = await response.json();
        return todo;
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
      return undefined;
    }
  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo: Todo = {
        id: new Date(),
        title: action.payload.title,
        completed: false,
      };
      state.list.push(todo);
    },
    deleteTodo: (state, action) => {
      state.list = state.list.filter((todo) => todo.id !== action.payload.id);
    },
    markComplete: (state, action) => {
      const obj = state.list.find((todo) => todo.id == action.payload.id);
      if (obj) {
        const index: number = state.list.indexOf(obj);
        state.list[index].completed = action.payload.completed;
      }
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
        }
      })
      .addCase(markCompleteThunk.fulfilled, (state, action) => {
        if (action.payload) {
          const todoId: Date = action.payload.id;
          const index = state.list.findIndex((todo) => todo.id == todoId);
          state.list[index].completed = action.payload.completed;
        }
      })
      .addCase(deleteTodoThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.list = action.payload;
        }
      });
  },
});

export const { addTodo, deleteTodo, markComplete } = todoSlice.actions;
export default todoSlice.reducer;

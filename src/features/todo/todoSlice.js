import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  status: "idle",
  error: null,
};

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  try {
    const response = await fetch("http://localhost:7000/todos");
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
  } catch (err) {
    throw new err();
  }
});

export const addTodoThunk = createAsyncThunk(
  "todos/addTodoThunk",
  async (payload) => {
    try {
      const response = await fetch("http://localhost:7000/todos", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const todo = await response.json();
        return todo;
      }
    } catch (err) {
      throw new err();
    }
  }
);

export const markCompleteThunk = createAsyncThunk(
  "todos/markCompleteThunk",
  async (payload) => {
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
        const todo = await response.json();
        return todo;
      }
    } catch (err) {
      throw new err();
    }
  }
);

export const deleteTodoThunk = createAsyncThunk(
  "todos/deleteTodoThunk",
  async (payload) => {
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
        const todos = await response.json();
        return todos;
      }
    } catch (err) {
      throw new err();
    }
  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: new Date(),
        title: action.payload.title,
        completed: false,
      };
      state.todos.push(todo);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
    markComplete: (state, action) => {
      const obj = state.todos.find((todo) => todo.id == action.payload.id);
      const index = state.todos.indexOf(obj);
      state.todos[index].completed = action.payload.completed;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = state.todos.concat(action.payload);
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTodoThunk.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(markCompleteThunk.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (todo) => todo.id == action.payload.id
        );
        state.todos[index].completed = action.payload.completed;
      })
      .addCase(deleteTodoThunk.fulfilled, (state, action) => {
        state.todos = action.payload;
      });
  },
});

export const { addTodo, deleteTodo, markComplete } = todoSlice.actions;
export default todoSlice.reducer;

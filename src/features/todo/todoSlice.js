import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [
      { id: 1, title: "todo1", completed: false },
      { id: 2, title: "todo2", completed: false },
      { id: 3, title: "todo3", completed: true },
      { id: 4, title: "todo4", completed: false },
      { id: 5, title: "todo5", completed: false },
    ],
  },
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
});

export const { addTodo, deleteTodo, markComplete } = todoSlice.actions;
export default todoSlice.reducer;

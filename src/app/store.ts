import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todoSlice";
import sessionReducer from "../features/authSlice";

const store = configureStore({
  reducer: {
    todos: todoReducer,
    session: sessionReducer,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;

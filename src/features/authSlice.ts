import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: null,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession: (state, action) => {
      state.auth = action.payload.auth;
    },
  },
});

export const { setSession } = sessionSlice.actions;
export default sessionSlice.reducer;

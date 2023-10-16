import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: "Select To-do List",
  reducers: {
    changeMessage: (state, action) => {
      return action.payload;
    },
  },
});

export const { changeMessage } = messageSlice.actions;
export default messageSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import titleSlice from "../utils/titleSlice";
import messageSlice from "../utils/messageSlice";
import taskSlice from "../utils/taskSlice";

const store = configureStore({
  reducer: {
    title: titleSlice,
    message: messageSlice,
    task: taskSlice,
  },
});

export default store;

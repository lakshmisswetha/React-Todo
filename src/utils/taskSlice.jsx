import { createSlice } from "@reduxjs/toolkit";

const getTasksData = () => {
  const tasksData = localStorage.getItem("tasksData");
  return JSON.parse(tasksData) || [];
};

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    taskTitles: [],
    tasksData: getTasksData(),
  },
  reducers: {
    addTaskItems: (state, action) => {
      const { taskTitle, taskItem } = action.payload;
      const taskData = state.tasksData.find(
        (task) => task.taskName === taskTitle
      );
      if (taskData) {
        taskData.itemsName.push({ name: taskItem, checked: false });
      } else {
        const newTaskData = {
          taskName: taskTitle,
          itemsName: [{ name: taskItem, checked: false }],
        };
        state.tasksData.push(newTaskData);
      }
      localStorage.setItem("tasksData", JSON.stringify(state.tasksData));
    },
    deleteTaskItems: (state, action) => {
      const { taskTitle, taskItem } = action.payload;
      const taskData = state.tasksData.find(
        (task) => task.taskName === taskTitle
      );
      const indexToRemove = taskData.itemsName.findIndex(
        (item) => item.name === taskItem
      );
      if (indexToRemove !== -1) {
        taskData.itemsName.splice(indexToRemove, 1);
      }
      localStorage.setItem("tasksData", JSON.stringify(state.tasksData));
    },
    deleteItem: (state, action) => {
      const name = action.payload;
      const tasksData = state.tasksData.filter(
        (task) => task.taskName !== name
      );
      state.tasksData = tasksData;
      localStorage.setItem("tasksData", JSON.stringify(tasksData));
    },
    checkTaskItems: (state, action) => {
      const { taskTitle, taskItem, isChecked } = action.payload;
      const updatedTasksData = state.tasksData.map((task) => {
        if (task.taskName === taskTitle) {
          return {
            ...task,
            itemsName: task.itemsName.map((item) => {
              if (item.name === taskItem) {
                return {
                  ...item,
                  checked: isChecked,
                };
              }
              return item;
            }),
          };
        }
        return task;
      });
      localStorage.setItem("tasksData", JSON.stringify(updatedTasksData));

      return { ...state, tasksData: updatedTasksData };
    },
    deleteAll: (state, action) => {
      const title = action.payload;
      state.tasksData = state.tasksData.map((task) => {
        if (task.taskName === title) {
          return {
            ...task,
            itemsName: [],
          };
        }
        return task;
      });
      localStorage.setItem("tasksData", JSON.stringify(state.tasksData));
    },
  },
});

export const {
  addTaskItems,
  deleteTaskItems,
  checkTaskItems,
  deleteItem,
  deleteAll,
} = taskSlice.actions;
export default taskSlice.reducer;

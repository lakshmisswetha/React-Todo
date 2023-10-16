export const getTaskNamesForTitle = (state, titleItem) => {
  const taskData = state.tasks.tasksData;
  const selectedTask = taskData.find((task) => task.taskName === titleItem);

  return selectedTask ? selectedTask.itemsName.map((item) => item.name) : [];
};

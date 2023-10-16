import React, { useEffect, useState, useRef } from "react";
import TaskTitle from "./TaskTitle";
import {
  addTaskItems,
  deleteTaskItems,
  checkTaskItems,
  deleteAll,
} from "../utils/taskSlice";

import { useSelector, useDispatch } from "react-redux";

function Task() {
  const ulRef = useRef();
  const dispatch = useDispatch();
  const titleItem = useSelector((store) => store.title);
  const messageText = useSelector((store) => store.message);
  const data = useSelector((store) => store.task);
  const [searchInput, setSearchInput] = useState("");
  const [showTaskItems, setShowTaskItem] = useState(false);

  const selectedTask = data.tasksData.find(
    (task) => task.taskName === titleItem
  );
  var selectedItemsName = selectedTask ? selectedTask.itemsName : [];
  const [filteredItems, setFilteredItems] = useState([]);

  const renderTaskItem = () => {
    return (
      <li style={{ display: "flex" }} className="task-item">
        <div className="input-fields">
          <input className="checkbox" type="checkbox" />
          <form onSubmit={(e) => handleItemSubmit(e, titleItem)} action="">
            <input
              type="text"
              className="item-name"
              placeholder="enter your task"
              onChange={(e) => setItemName(e.target.value)}
              autoFocus
            />
          </form>
        </div>

        <img className="del-task-item" src="/src/Assets/delete_black.svg" />
      </li>
    );
  };

  const addTaskItem = () => {
    if (messageText === "Select To-do List") {
      alert("Select a To-Do to add task");
      return;
    }

    setShowTaskItem(true);
  };

  const [itemName, setItemName] = useState("");
  const handleItemSubmit = (e, titleItem) => {
    e.preventDefault();
    if (itemName != "") {
      dispatch(
        addTaskItems({
          taskTitle: titleItem,
          taskItem: itemName,
        })
      );
    }
    setShowTaskItem(false);
    setItemName("");
  };

  const handleDeleteItem = (item, titleItem) => {
    dispatch(
      deleteTaskItems({
        taskTitle: titleItem,
        taskItem: item,
      })
    );
  };

  const handleChecked = (e) => {
    const isChecked = e.target.checked;
    const inputValue =
      e.target.nextElementSibling.querySelector(".item-name").value;

    dispatch(
      checkTaskItems({
        taskTitle: titleItem,
        taskItem: inputValue,
        isChecked: isChecked,
      })
    );
  };
  const clearUL = () => {
    ulRef.current.innerHTML = "";
  };

  const handleSearch = (searchText) => {
    setSearchInput(searchText);

    const updateFilteredItems = (searchInput) => {
      return selectedItemsName.filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
      );
    };
    const filteredItems = updateFilteredItems(searchText);
    setFilteredItems(filteredItems);
  };

  const deleteAllTask = () => {
    dispatch(deleteAll(titleItem));
  };

  return (
    <div className="task">
      <TaskTitle handleSearchText={handleSearch} />
      <div id="task-content">
        {selectedItemsName.length > 0 || showTaskItems === true ? null : (
          <div id="select-todo-message">{messageText}</div>
        )}

        <ul id="task-items-container" ref={ulRef}>
          {searchInput
            ? filteredItems.map((item, index) => (
                <li
                  style={{ display: "flex" }}
                  className="task-item"
                  key={index}
                >
                  <div className="input-fields">
                    <input
                      onChange={handleChecked}
                      checked={item.checked}
                      className="checkbox"
                      type="checkbox"
                    />
                    <form
                      onSubmit={(e) => handleItemSubmit(e, titleItem)}
                      action=""
                    >
                      <input
                        type="text"
                        className="item-name"
                        placeholder="enter your task"
                        onChange={(e) => setItemName(e.target.value)}
                        value={item.name}
                      />
                    </form>
                  </div>
                  <img
                    onClick={() => handleDeleteItem(item.name, titleItem)}
                    className="del-task-item"
                    src="/src/Assets/delete_black.svg"
                  />
                </li>
              ))
            : selectedItemsName.map((item, index) => (
                <li
                  style={{ display: "flex" }}
                  className="task-item"
                  key={index}
                >
                  <div className="input-fields">
                    <input
                      onChange={handleChecked}
                      checked={item.checked}
                      className="checkbox"
                      type="checkbox"
                    />
                    <form
                      onSubmit={(e) => handleItemSubmit(e, titleItem)}
                      action=""
                    >
                      <input
                        type="text"
                        className="item-name"
                        placeholder="enter your task"
                        onChange={(e) => setItemName(e.target.value)}
                        value={item.name}
                      />
                    </form>
                  </div>
                  <img
                    onClick={() => handleDeleteItem(item.name, titleItem)}
                    className="del-task-item"
                    src="/src/Assets/delete_black.svg"
                  />
                </li>
              ))}
          {searchInput && filteredItems.length === 0 && (
            <div id="result-not-found">Result Not Found !!</div>
          )}
          {showTaskItems && renderTaskItem()}
        </ul>
      </div>

      <div className="task-menu">
        <button onClick={addTaskItem} className="plus-btn">
          <img className="plus" src="src/Assets/plus.png" alt="plus" />
        </button>
        <button onClick={deleteAllTask} className="clean-btn">
          <img className="clean" src="src/Assets/clean.png" alt="clean" />
        </button>
      </div>
    </div>
  );
}

export default Task;

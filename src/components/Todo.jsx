import React, { useState, useEffect } from "react";
import { changeTitle } from "../utils/titleSlice";
import { useDispatch, useSelector } from "react-redux";
import { changeMessage } from "../utils/messageSlice";
import { deleteItem } from "../utils/taskSlice";

function Todo() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [todoItems, setTodoItems] = useState([]);
  const [newTask, setNewTask] = useState("");
  const titleItem = useSelector((store) => store.title);
  const [listItems, setListItems] = useState([]);
  const saveData = (updatedListItems) => {
    localStorage.setItem("data", JSON.stringify(updatedListItems));
  };

  const dispatch = useDispatch();

  const handleCLick = (item) => {
    dispatch(changeTitle(item));
    dispatch(changeMessage("Add To-Do"));
  };

  useEffect(() => {
    const savedData = localStorage.getItem("data");
    if (savedData) {
      setListItems(JSON.parse(savedData));
    }
  }, []);

  const [searchInput, setSearchInput] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const handleSearchChange = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);

    const filtered = listItems.filter((item) =>
      item.trim().toLowerCase().includes(inputValue.trim().toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const deleteItemName = (itemToDel) => {
    const savedData = localStorage.getItem("data");
    const parsedData = JSON.parse(savedData);
    const index = parsedData.findIndex((item) => item === itemToDel);
    if (index !== -1) {
      parsedData.splice(index, 1);
    }
    setListItems(parsedData);
    localStorage.setItem("data", JSON.stringify(parsedData));
    dispatch(deleteItem(itemToDel));
    if (titleItem === itemToDel) {
      dispatch(changeTitle(""));
      dispatch(changeMessage("Select To-do List"));
    }
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    setSearchInput("");
  };

  const addTask = () => {
    if (newTask === "") {
      alert("Write Something");
    } else {
      const newTodo = { text: newTask, id: Date.now() };
      setTodoItems([...todoItems, newTodo]);
      const updatedListItems = [...listItems, newTask];
      setListItems(updatedListItems);
      setNewTask("");
      saveData(updatedListItems);
    }
  };

  return (
    <>
      <div className="todo">
        <div className="list">
          <div
            style={{ display: isSearchVisible ? "none" : "flex" }}
            className="list-head"
          >
            <div className="to-do-list">To-do List</div>
            <button onClick={toggleSearch} className="search-button">
              <img
                className="search"
                src="src/Assets/search.png"
                alt="search"
              />
            </button>
          </div>

          {isSearchVisible && (
            <div className="search-list">
              <input
                onChange={handleSearchChange}
                className="search-input"
                type="text"
                placeholder="Search"
                autoFocus
              />
              <button onClick={toggleSearch} className="close-button">
                <img
                  className="close"
                  src="src/Assets/close.png"
                  alt="closebtn"
                />
              </button>
            </div>
          )}
        </div>

        <div id="list-container">
          <ul id="list-items">
            {searchInput === "" ? (
              listItems.length > 0 ? (
                listItems.map((item, index) => (
                  <li key={index} onClick={() => handleCLick(item)}>
                    {item}
                    <span>
                      <img
                        src="src/Assets/delete_black.svg"
                        alt="Delete Icon"
                        onClick={(e) => {
                          deleteItemName(item);
                          e.stopPropagation();
                        }}
                        onMouseEnter={(e) => {
                          e.target.src = "src/Assets/delete_red.svg";
                        }}
                        onMouseLeave={(e) => {
                          e.target.src = "src/Assets/delete_black.svg";
                        }}
                      />
                    </span>
                  </li>
                ))
              ) : (
                <div id="create-todo-message">Create To-do</div>
              )
            ) : filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <li key={index} onClick={() => handleCLick(item)}>
                  {item}
                  <span>
                    <img
                      src="src/Assets/delete_black.svg"
                      alt="Delete Icon"
                      onClick={(e) => {
                        deleteItemName(item);
                        e.stopPropagation();
                      }}
                      onMouseEnter={(e) => {
                        e.target.src = "src/Assets/delete_red.svg";
                      }}
                      onMouseLeave={(e) => {
                        e.target.src = "src/Assets/delete_black.svg";
                      }}
                    />
                  </span>
                </li>
              ))
            ) : (
              <div id="notFound">Result Not Found !!</div>
            )}
          </ul>
        </div>

        <div className="create-list">
          <input
            id="create-todo"
            type="text"
            placeholder="create new todo"
            value={newTask}
            onChange={(e) => {
              setNewTask(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTask();
              }
            }}
          />
          <img
            onClick={addTask}
            className="add"
            src="src/Assets/add.png"
            alt="add"
          />
        </div>
      </div>
    </>
  );
}

export default Todo;

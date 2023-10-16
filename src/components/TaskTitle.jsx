import React, { useState } from "react";
import { useSelector } from "react-redux";

function TaskTitle({ handleSearchText }) {
  const titleItem = useSelector((store) => store.title);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    handleSearchText("");
  };

  const handleSearch = (value) => {
    handleSearchText(value);
  };

  return (
    <>
      <div
        style={{ display: isSearchVisible ? "none" : "flex" }}
        className="task-title"
      >
        <h2>
          <div id="title-text">{titleItem}</div>
        </h2>
        <button onClick={toggleSearch} className="title-search">
          <img
            className="title-search1"
            src="src/Assets/search.png"
            alt="search"
          />
        </button>
      </div>

      {isSearchVisible && (
        <div className="search-task-items">
          <input
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            autoFocus
            className="task-item-search"
            type="text"
            placeholder="Search"
          />
          <button onClick={toggleSearch} className="clear-button">
            <img
              className="clearbtn"
              src="src/Assets/close.png"
              alt="closebtn"
            />
          </button>
        </div>
      )}
    </>
  );
}

export default TaskTitle;

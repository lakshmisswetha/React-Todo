import React from "react";
import Todo from "./Todo";
import Task from "./Task";

function Body() {
  return (
    <>
      <div className="main">
        <div className="container">
          <div className="content">
            <Todo />
            <Task />
          </div>
        </div>
      </div>
    </>
  );
}

export default Body;

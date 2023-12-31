import React from "react";
import ReactDOM from "react-dom/client";

import Body from "./components/Body";
import Header from "./components/Header";
import "./app.css";
import { Provider } from "react-redux";
import store from "./components/store";

function App() {
  return (
    <Provider store={store}>
      <Header />
      <Body />
    </Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);

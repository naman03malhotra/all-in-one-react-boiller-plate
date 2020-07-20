import React from "react";
import ReactDOM from "react-dom";
import App from "./app";

ReactDOM.render(<App initialState={true} />, document.getElementById("root"));

if (process.env.DEVELOPMENT && module && module.hot) {
  module.hot.accept();
}

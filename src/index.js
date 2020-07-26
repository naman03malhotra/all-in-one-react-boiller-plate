import React from "react";
import ReactDOM from "react-dom";
import App from "./client/app";

ReactDOM.hydrate(
  <App {...window.APP_STATE} />,
  document.getElementById("root")
);

if (process.env.DEVELOPMENT && module && module.hot) {
  module.hot.accept();
}

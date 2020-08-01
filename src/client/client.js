import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "../components/app";
import appReducer from "../reducers/app_reducer";

const store = createStore(appReducer, { ...window.APP_STATE });

ReactDOM.hydrate(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

if (process.env.DEVELOPMENT && module && module.hot) {
  module.hot.accept();
}

import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";
import fs from "fs";
import http2 from "http2";
import path from "path";
import { createStore } from "redux";
import { Provider } from "react-redux";

import Html from "./html";
import App from "../components/app";
import appReducer from "../reducers/app_reducer";

const key = fs.readFileSync("./key.pem");
const cert = fs.readFileSync("./cert.pem");

const app = express();

app.use(express.static(path.join(__dirname)));

app.get("*", async (req, res) => {
  const scripts = ["vendors~main.js", "main.js", "runtime.js"];

  const initialState = { initialText: "rendered on the server" };

  const store = createStore(appReducer, initialState);

  const appMarkup = ReactDOMServer.renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const html = ReactDOMServer.renderToStaticMarkup(
    <Html children={appMarkup} scripts={scripts} initialState={initialState} />
  );

  res.send(`<!doctype html>${html}`);
});

// http2
//   .createSecureServer({ key: key, cert: cert }, app)
//   .listen(3040, () => console.log("Express running on port 3040"));

app.listen(3040, () => console.log("Express running on port 3040"));

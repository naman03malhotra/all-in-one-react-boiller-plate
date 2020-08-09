import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";
import fs from "fs";
import compress from "compression";
import http2 from "http2";
import path from "path";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router";

import Html from "./html";
import App from "../components/app";
import appReducer from "../reducers/app_reducer";

const key = fs.readFileSync("./key.pem");
const cert = fs.readFileSync("./cert.pem");

// console.log("dr", __dirname);
const manifestPath = path.join(__dirname, "..", "wp_manifest", "manifest.json");

const runtimeContent = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));

const app = express();

// this will be handled by cdn
// app.get("*.js", function (req, res, next) {
//   req.url = req.url + ".gz";
//   res.set("Content-Encoding", "gzip");
//   res.set("Content-Type", "text/javascript");
//   next();
// });

app.use(express.static(path.join(__dirname)));
app.use(compress());

app.get("*", async (req, res) => {
  const initialState = { initialText: "rendered on the server" };
  const context = {};

  const store = createStore(appReducer, initialState);

  const appMarkup = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  );

  const html = ReactDOMServer.renderToStaticMarkup(
    <Html
      children={appMarkup}
      scripts={runtimeContent}
      initialState={initialState}
    />
  );

  res.send(`<!doctype html>${html}`);
});

// http2
//   .createSecureServer({ key: key, cert: cert }, app)
//   .listen(3040, () => console.log("Express running on port 3040"));

app.listen(3040, () => console.log("Express running on port 3040"));

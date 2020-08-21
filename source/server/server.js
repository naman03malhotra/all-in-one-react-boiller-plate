import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";
import fs from "fs";
import compress from "compression";
import url from "url";
import proxy from "proxy-middleware";
import http2 from "http2";
import path from "path";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router";

import Html from "./html";
import App from "../components/app";
import appReducer from "../reducers/app_reducer";

import { isDevelopment, isProduction } from "./server_utils";

const key = fs.readFileSync("./key.pem");
const cert = fs.readFileSync("./cert.pem");

let runtimeContent;

const manifestPath =
  isProduction() && path.join(__dirname, "..", "wp_manifest/manifest.json");

if (isProduction()) {
  runtimeContent = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
} else {
  runtimeContent = {
    "main.js": "/assets/main.js",
    "runtime.js": "/assets/runtime.js",
  };
}

// this will be handled by cdn
// app.get("*.js", function (req, res, next) {
//   req.url = req.url + ".gz";
//   res.set("Content-Encoding", "gzip");
//   res.set("Content-Type", "text/javascript");
//   next();
// });

function server() {
  const app = express();
  app.use(express.static(path.join(__dirname)));
  app.use(compress());

  if (isDevelopment()) {
    app.use(
      "/assets/",
      proxy(url.parse("http://localhost:9000/public/assets/"))
    );
  }

  app.get("*", async (req, res) => {
    const { query } = req;
    const ANDROID_ENV = query.android === "true";

    const initialState = {
      initialText: "rendered on the server",
      ANDROID: {
        ANDROID_REFRESH: false,
        ANDROID_ENV,
      },
    };
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
        assets={runtimeContent}
        initialState={initialState}
      />
    );

    res.send(`<!doctype html>${html}`);
  });

  // http2
  //   .createSecureServer({ key: key, cert: cert }, app)
  //   .listen(3040, () => console.log("Express running on port 3040"));

  const nodeServer = app.listen(3040, () =>
    console.log("Express running on port 3040")
  );

  return nodeServer;
}

export default server;

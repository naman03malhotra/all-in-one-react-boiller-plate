import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";
import fs from "fs";
import http2 from "http2";
import path from "path";

import Html from "./html";
import App from "../client/app";

const key = fs.readFileSync("./key.pem");
const cert = fs.readFileSync("./cert.pem");

const app = express();

app.use(express.static(path.join(__dirname)));

app.get("*", async (req, res) => {
  const scripts = ["vendors~main.js", "main.js", "runtime.js"];

  const initialState = { initialText: "rendered on the server" };

  const appMarkup = ReactDOMServer.renderToString(<App {...initialState} />);

  const html = ReactDOMServer.renderToStaticMarkup(
    <Html children={appMarkup} scripts={scripts} initialState={initialState} />
  );

  res.send(`<!doctype html>${html}`);
});

// http2
//   .createSecureServer({ key: key, cert: cert }, app)
//   .listen(3040, () => console.log("Express running on port 3040"));

app.listen(3040, () => console.log("Express running on port 3040"));

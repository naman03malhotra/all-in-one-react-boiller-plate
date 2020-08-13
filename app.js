"use strict";

const NODE_ENV = process.env.NODE_ENV;

const isDevelopment = NODE_ENV === "development" || !NODE_ENV;

if (isDevelopment) {
  require("@babel/register")({
    extends: "./babel.config.js",
    ignore: [/node_modules/],
    cache: false,
  });
}

const serverPath = isDevelopment
  ? "./src/server/server.js"
  : "./dist/server.js";

function startServer() {
  const server = require(serverPath).default;

  return server();
}

// Require hook to ignore less includes
function ignoreRequire(extension) {
  require.extensions[extension] = function (m, filename) {
    return;
  };
}

// ignore scss, css requires
ignoreRequire(".scss");
ignoreRequire(".css");

startServer();

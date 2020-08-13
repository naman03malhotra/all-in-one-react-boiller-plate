const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const HappyPack = require("happypack");

const serverConfig = {
  mode: "production",
  name: "server",
  target: "node",
  externals: [nodeExternals()],
  entry: {
    server: [path.resolve(__dirname, "../src/server/server.js")],
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js",
    libraryTarget: "commonjs2",
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new HappyPack({
      id: "js",
      loaders: ["babel-loader"],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "happypack/loader?id=js",
        },
      },
      {
        test: /\.scss|.css$/,
        exclude: /node_modules/,
        use: ["ignore-loader"],
      },
    ],
  },
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
};

module.exports = [serverConfig];

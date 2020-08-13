const webpack = require("webpack");
const ManifestPlugin = require("webpack-manifest-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const fs = require("fs");

const clientConfig = {
  mode: "development",
  target: "web",
  entry: [path.resolve(__dirname, "../src/client/client.js")],
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js",
    publicPath: "https://localhost:9000/public/assets/",
  },
  devtool: "cheap-module-eval-source-map",
  devServer: {
    hotOnly: true,
    https: true,
    key: fs.readFileSync("./key.pem"),
    cert: fs.readFileSync("./cert.pem"),
    progress: true,
    compress: true,
    port: 9000,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
  optimization: {
    runtimeChunk: "single",
    // splitChunks: {
    //   chunks: "all",
    // },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ["style-loader", "raw-loader", "sass-loader"],
      },
      {
        test: /\.(png|j?g|svg|gif)?$/,
        use: "file-loader",
      },
    ],
  },
  plugins: [
    // new ManifestPlugin({
    //   fileName: path.join("..", "wp_dev_manifest", "manifest.json"),
    //   writeToFileEmit: true,
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        DEVELOPMENT: true,
        NODE_ENV: JSON.stringify("development"),
      },
    }),
    // new HtmlWebPackPlugin({
    //   template: path.resolve(__dirname, "../public/index.html"),
    //   filename: "index.html",
    // }),
  ],
  // cache: true,
};

module.exports = [clientConfig];

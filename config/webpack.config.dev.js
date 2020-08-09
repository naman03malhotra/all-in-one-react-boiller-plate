const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

const clientConfig = {
  mode: "development",
  target: "web",
  entry: [path.resolve(__dirname, "../src/client/client.js")],
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js",
    publicPath: "/",
  },
  devtool: "cheap-module-eval-source-map",
  devServer: {
    hotOnly: true,
    progress: true,
    port: 8081,
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
    },
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

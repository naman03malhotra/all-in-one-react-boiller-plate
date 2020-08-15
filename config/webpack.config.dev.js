const webpack = require("webpack");
const ManifestPlugin = require("webpack-manifest-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

console.log("w", path.resolve(__dirname, ".."));

const clientConfig = {
  mode: "development",
  target: "web",
  context: path.resolve(__dirname, ".."),
  entry: [path.resolve(__dirname, "../src/client/client.js")],
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js",
    publicPath: "http://localhost:9000/public/assets/",
  },
  devtool: "cheap-module-eval-source-map",
  devServer: {
    hotOnly: true,
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
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                // exportLocalsConvention: "camelCaseOnly",
                mode: "local",
                localIdentContext: path.resolve(__dirname, ".."),
                localIdentName: "[name]__[local]__[hash:base64:8]",
              },
            },
          },
          "sass-loader",
        ],
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
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
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
};

module.exports = [clientConfig];

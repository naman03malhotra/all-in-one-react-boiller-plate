const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const ManifestPlugin = require("webpack-manifest-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  target: "web",
  entry: {
    main: "./src/client/client.js",
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name]-[contenthash:10].js",
    chunkFilename: "[name]-[contenthash:10].js",
    publicPath: "/",
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
          { loader: "css-loader", options: { url: false } },
          "sass-loader",
        ],
      },
      {
        test: /\.(png|j?g|svg|gif)?$/,
        exclude: /node_modules/,
        use: "file-loader",
      },
      {
        test: /wp-manifest/,
        use: "ignore-loader",
      },
    ],
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          priority: 1,
          minSize: 100000,
          enforce: true,
          reuseExistingChunk: true,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace("@", "")}`;
          },
        },
        commons: {
          test: /[\\/]src[\\/]/,
          minSize: 10000,
          minChunks: 2,
          priority: 0,
          enforce: true,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new ManifestPlugin({
      fileName: path.join("..", "wp_manifest", "manifest.json"),
    }),
    // new CompressionPlugin(), // this will be handled by CDN
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        PRODUCTION: true,
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new MiniCssExtractPlugin({
      filename: "[name]-[contenthash:8].css",
      chunkFilename: "[name]-[contenthash:8].css",
    }),
    // new BundleAnalyzerPlugin(),
  ],
};

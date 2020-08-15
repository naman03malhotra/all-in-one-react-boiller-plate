const path = require("path");

module.exports = function (api) {
  api.cache(false);
  console.log("b", path.resolve(__dirname));

  const presets = [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: [">2%"],
        },
      },
    ],
    ["@babel/preset-react"],
  ];

  const plugins = ["@babel/plugin-transform-runtime"];

  // const env = {
  //   node: {
  //     plugins:
  //   },
  // };

  if (process.env.BABEL_ENV === "node") {
    plugins.push([
      "css-modules-transform",
      {
        // preprocessCss: "./config/pre.js",
        devMode: true,
        generateScopedName: "[name]__[local]__[hash:base64:8]",
        extensions: [".module.scss"],
        rootDir: path.resolve(__dirname),
        // keepImport: true,
      },
    ]);
  }

  return {
    // env,
    presets,
    plugins,
  };
};

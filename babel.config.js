module.exports = function (api) {
  api.cache(false);

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

  return {
    presets,
    plugins,
  };
};

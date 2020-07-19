module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: [">2%"],
        },
      },
    ],
  ];

  const plugins = ["@babel/transform-react-jsx"];

  return {
    presets,
    plugins,
  };
};

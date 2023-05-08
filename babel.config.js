module.exports = (api) => {
  api.cache(true);

  return {
    plugins: [
      "@babel/syntax-dynamic-import",
      "@babel/plugin-transform-modules-commonjs",
      "babel-plugin-add-module-exports",
    ],
    presets: [
      [
        "@babel/preset-env",
        {
          modules: false,
        },
      ],
    ],
  };
};

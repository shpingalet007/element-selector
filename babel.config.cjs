module.exports = (api) => {
  api.cache(true);

  return {
    plugins: ["@babel/syntax-dynamic-import"],
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

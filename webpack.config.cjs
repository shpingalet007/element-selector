const path = require("path");

const config = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    library: {
      type: "window",
      name: "ElementSelector",
      export: "default",
    },
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.js$/i,
        loader: "babel-loader",
      },
    ],
  },
};

module.exports = (env) => {
  if (env.production) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};

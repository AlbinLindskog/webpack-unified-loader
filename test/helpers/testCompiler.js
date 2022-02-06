import path from "path";

import webpack from "webpack";
import { createFsFromVolume, Volume } from "memfs";

export const getCompiler = (fixture, loaderOptions = {}, config = {}) => {
  const fullConfig = {
    mode: "development",
    devtool: config.devtool || false,
    context: path.resolve(__dirname, "../fixtures"),
    entry: path.resolve(__dirname, "../fixtures", fixture),
    output: {
      path: path.resolve(__dirname, "../outputs/"),
      filename: "[name].bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.js$/i,
          rules: [
            {
              loader: require.resolve("../../src"),
              options: loaderOptions,
            },
          ],
        },
      ],
    },
    plugins: [],
    ...config,
  };

  const compiler = webpack(fullConfig);

  if (!config.outputFileSystem) {
    compiler.outputFileSystem = createFsFromVolume(new Volume());
  }

  return compiler;
};


export const compile = (compiler) =>
  new Promise((resolve, reject) => {
    compiler.run((error, stats) => {
      if (error) {
        return reject(error);
      }
      return resolve(stats);
    });
  });

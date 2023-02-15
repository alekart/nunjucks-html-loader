import path from 'path';

// eslint-disable-next-line import/no-extraneous-dependencies
import HTMLWebpackPlugin from 'html-webpack-plugin';

import webpack from 'webpack';
import { createFsFromVolume, Volume } from 'memfs';

export default (fixture, loaderOptions = {}, config = {}) => {
  const fullConfig = {
    mode: 'development',
    devtool: config.devtool || false,
    context: path.resolve(__dirname, '../fixtures'),
    entry: path.resolve(__dirname, '../fixtures', fixture),
    output: {
      path: path.resolve(__dirname, '../outputs'),
      filename: '[name].bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.njk$/i,
          use: [
            'raw-loader',
            {
              loader: path.resolve(__dirname, '../../src'),
              options: loaderOptions || {},
            },
          ],
        },
      ],
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: fixture,
        filename: `${fixture.replace('.njk', '')}.html`,
      }),
    ],
    ...config,
  };

  const compiler = webpack(fullConfig);

  if (!config.outputFileSystem) {
    compiler.outputFileSystem = createFsFromVolume(new Volume());
  }

  return compiler;
};

const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');

module.exports = {
  //...
  mode: 'development',
  devServer: {
    open: true,
    hot: false,
    static: [{
      directory: path.join(__dirname, 'src/scripts'),
    }, {
      directory: path.join(__dirname, 'src/scripts/dist'),
    }],
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.njk$/,
        use: [
          'html-loader',
          {
            loader: path.resolve('loader/loader.js'),
            options: {
              templates: path.resolve(__dirname, 'src/'),
              locale: 'fr',
              dataPath: path.resolve(__dirname, 'src/data'),
              data: {
              },
              nunjucks: {
                throwOnUndefined: true,
              }
            },
          },
        ],
      },
    ],
  },
  plugins: [
    ...getNunjucksTemplates(),
  ],
};

function getNunjucksTemplates(htmlWebpackPluginOptions = {}) {
  return glob.sync('src/!(_*).njk').map((fileName) => {
    const templateName = path.basename(fileName).replace(/\.njk$/, '');
    return new HTMLWebpackPlugin({
      template: fileName,
      filename: `${templateName}.html`,
      ...htmlWebpackPluginOptions,
    });
  });
}

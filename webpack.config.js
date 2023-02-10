const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');

module.exports = {
  //...
  mode: 'development',
  entry: path.join(__dirname, 'demo/index.js'),
  devServer: {
    open: true,
    hot: false,
    static: [{
      directory: path.join(__dirname, 'demo/scripts'),
    }, {
      directory: path.join(__dirname, 'demo/scripts/dist'),
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
            loader: path.resolve('src/loader.js'),
            options: {
              templates: path.resolve(__dirname, 'demo/'),
              locale: 'fr',
              dataPath: path.resolve(__dirname, 'demo/data'),
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
  return glob.sync('demo/!(_*).njk').map((fileName) => {
    const templateName = path.basename(fileName).replace(/\.njk$/, '');
    return new HTMLWebpackPlugin({
      template: fileName,
      filename: `${templateName}.html`,
      ...htmlWebpackPluginOptions,
    });
  });
}

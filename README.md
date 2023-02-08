<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![cover][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]

# nunjucks-html-loader



## Getting Started

To begin, you'll need to install `nunjucks-html-loader`:

```console
$ npm install @alekart/nunjucks-html-loader --save-dev
```

Then add the loader to your `webpack` config. For example:

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.njk$/,
        use: [
          'html-loader',
          {
            loader: `nunjucks-html-loader`,
            options: { ...options },
          },
        ],
      },
    ],
  },
};
```

## Options

### `[option]`

Type: `[type|other-type]`
Default: `[type|null]`

[ option description ]

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        loader: `nunjucks-html-loader`,
        options: {
          [option]: '',
        },
      },
    ],
  },
};
```

## Examples

[ example outline text ]

**webpack.config.js**

```js
// Example setup here..
```

## License

[MIT](./LICENSE)

[npm]: https://img.shields.io/npm/v/nunjucks-html-loader.svg
[npm-url]: https://npmjs.com/package/nunjucks-html-loader
[node]: https://img.shields.io/node/v/nunjucks-html-loader.svg
[node-url]: https://nodejs.org
[deps]: https://david-dm.org/webpack-contrib/nunjucks-html-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/nunjucks-html-loader
[tests]: https://dev.azure.com/webpack-contrib/nunjucks-html-loader/_apis/build/status/webpack-contrib.nunjucks-html-loader?branchName=master
[tests-url]: https://dev.azure.com/webpack-contrib/nunjucks-html-loader/_build/latest?definitionId=2&branchName=master
[cover]: https://codecov.io/gh/webpack-contrib/nunjucks-html-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/nunjucks-html-loader
[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=nunjucks-html-loader
[size-url]: https://packagephobia.now.sh/result?p=nunjucks-html-loader

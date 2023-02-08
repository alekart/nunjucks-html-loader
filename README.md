<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

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

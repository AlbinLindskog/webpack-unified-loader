<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

# webpack-unified-loader

A webpack loader allowing you to use the [unified](https://github.com/unifiedjs/unified) ecosystem in file
transformations. 

## Getting Started

To begin, you'll need to install `val-loader`:

```console
$ npm install --save git+https://github.com/AlbinLindskog/webpack-unified-loader.git
```

Then add the loader to your `webpack` config, along with the unified plugins you wish to use.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: 'unified-loader',
            options: {
              use: [remarkParse, remarkRehype, rehypeStringify]
            }  
          },
        ],
      },
    ],
  },
};
```

If you need to specify options for the plugin, you can pass the plugin using an array, where the second item are the
options.

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: 'unified-loader',
            options: {
              use: [remarkParse, remarkRehype, [rehypeStringify, {quote: "'"}]]
            }  
          },
        ],
      },
    ],
  },
};
```

TODO: Check version of unified it works with.
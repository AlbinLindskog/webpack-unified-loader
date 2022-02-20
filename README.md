<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

# webpack-unified-loader

A webpack loader allowing you to use the [unified](https://github.com/unifiedjs/unified) ecosystem in file
transformations. 

Webpack only supports CJS loaders, while unified v.10 dropped support for CJS. This loader manages the compatibility
for you, allowing you to use any version of unified with webpack.

This loader is also published as an ESM module, so when webpack adds support for ESM loaders will it work
without any changes.

## Getting Started

To begin, you'll need to install `unified-loader`:

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

## A note on the testing
Jest have not fully implemented support for ESM is their runtime yet, in particular are dynamic imports, which this
package uses to manage to compatability, broken. See [issue 35889](https://github.com/nodejs/node/issues/35889).
 
As such I run the unit tests for the loader itself by transpiling loader.cjs (despite it already being a CJS file)
with babel, and run the tests on that. This run also tests for CJS compatability.

Compatability with ESM is tested by a subsequent run of jest in ESM-mode, which does not run the unit tests for the
loader.

I will revisit this when jest finish supports for ESM. Unless Webpack does it first, since that would remove the need
for this loader. ¯\_(ツ)_/¯

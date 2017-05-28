const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const projectRoot = path.join(__dirname, '../../');
const clientSrc = path.join(projectRoot, 'src/client');

module.exports = {
  entry: {
    'app': path.join(clientSrc, '/index.js')
  },

  resolve: {
    extensions: [ '.js', '.svelte' ]
  },

  output: {
    path: path.join(projectRoot, '/dist'),
    filename: '[name].js',
    chunkFilename: '[name].[id].js'
  },

  resolveLoader: {
    alias:
    {
      'fix-ref-attr-loader': path.join(__dirname, '../loader/fix-ref-attrs')
    }
  },

  module: {
    rules: [
      {
        test: /\.svelte$/,
        use:
        [
          'svelte-loader',
          'fix-ref-attr-loader',
          'postcss-html-loader'
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(clientSrc, '/index.html'),
      minify:
      {
        minifyCSS: true,
        collapseWhitespace: true,
        sortAttributes: true,
        sortClassName: true,
        removeOptionalTags: true,
        removeAttributeQuotes: true
      }
    })
  ]
};

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const projectRoot = path.join(__dirname, '../../');
const clientSrc = path.join(projectRoot, 'src/client');

module.exports = {
  entry: {
    'app': path.join(clientSrc, '/index.js'),
    'vendor': path.join(clientSrc, '/vendor.js')
  },

  resolve: {
    extensions: [ '.js', '.svelte' ]
  },

  output: {
    path: path.join(projectRoot, '/dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[id].js'
  },

  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  },

  resolveLoader: {
    alias:
    {
      'fix-standalone-svelte-directives-loader': path.join(__dirname, '../loader/fix-standalone-svelte-directives')
    }
  },

  module: {
    rules: [
      {
        test: /\.svelte$/,
        use:
        [
          {
            loader: 'svelte-loader',
            options:
            {
              cascade: false
            }
          },
          'fix-standalone-svelte-directives-loader',
          'postcss-html-loader'
        ]
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor']
    }),

    new CopyWebpackPlugin
    ([
      { from: path.join(clientSrc, '/assets'), to: 'assets' },
    ]),

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

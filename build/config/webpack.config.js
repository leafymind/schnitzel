const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const projectRoot = path.join(__dirname, '../../');
const clientSrc = path.join(projectRoot, 'src/client');

module.exports = {
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  },

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
      favicon: path.join(clientSrc, '/assets/img/logo.png')
    }),

    new OpenBrowserPlugin({
      url: 'http://localhost:8080'
    }),
  ]
};

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
      },
      {
        test: /material-design-lite\/.+\.css$/,
        use: ExtractTextPlugin.extract
        ({
          use:
          [
            {
              loader: 'css-loader',
              options:
              {
                camelCase: 'only',
                modules: true,
                importLoaders: true,
                localIdentName: 'mdl-[local]___[hash:base64:5]'
              }
            },
            {
              loader: 'replace-loader',
              options:
              {
                flags: 'g',
                regex: '\\.mdl-',
                sub: '.'
              }
            }
          ]
        })
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor']
    }),

    new ExtractTextPlugin("styles.css"),

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

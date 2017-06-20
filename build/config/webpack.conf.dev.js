const path = require('path');

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const commonConfig = require('./webpack.conf.js');

module.exports = webpackMerge(commonConfig,
{
  devtool: 'inline-source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({ url: 'http://localhost:8080' })
  ]
});

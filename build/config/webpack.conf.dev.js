const path = require('path');

const webpackMerge = require('webpack-merge');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const commonConfig = require('./webpack.conf.js');

module.exports = webpackMerge(commonConfig,
{
  devtool: 'inline-source-map',

  plugins: [
    new OpenBrowserPlugin({
      url: 'http://localhost:8080'
    })
  ]
});

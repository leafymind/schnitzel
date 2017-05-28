const path = require('path');

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const BabiliPlugin = require("babili-webpack-plugin");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');

const commonConfig = require('./webpack.conf.js');

module.exports = webpackMerge(commonConfig,
{
  plugins:
  [
    new webpack.NoEmitOnErrorsPlugin(),

    new BabiliPlugin({}, { comments: false }),

    new FaviconsWebpackPlugin
    ({
      logo: path.join(__dirname, '../../src/client/assets/img/logo.png'),
      title: 'Schnitzel',
      orientation: 'portrait', // FIXME
      theme_color: '#673AB7', // FIXME
      background: '#673AB7',
      icons:
      {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: false,
        opengraph: true,
        twitter: true,
        yandex: false,
        windows: true
      }
    })
  ]
});

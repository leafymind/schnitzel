const path = require('path');

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const BabiliPlugin = require("babili-webpack-plugin");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MergeJsonsWebpackPlugin = require('merge-jsons-webpack-plugin');

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
      prefix: 'assets/meta/',
      title: 'Schnitzel',
      start_url: '/#/overview?homescreen=true',
      manifest: true,
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
    }),

    new MergeJsonsWebpackPlugin
    ({
      "files":
      [
        path.join(__dirname, '../../dist/assets/meta/manifest.json'),
        path.join(__dirname, '../../src/client/assets/meta/manifest.json')
      ],
      "output":
      {
        "fileName": path.join(__dirname, '../../dist/assets/meta/manifest.json')
      }
    })
  ]
});
